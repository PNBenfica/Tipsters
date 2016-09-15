#!/usr/bin/env python

"""
tipsters.py -- tipsters server-side Python App Engine API;
    uses Google Cloud Endpoints
"""


import endpoints
from protorpc import messages
from protorpc import message_types
from protorpc import remote
from models import BetMessage
from models import ChoiceMessage
from models import EventMessage
from models import MatchMessage
from models import SportMessage
from models import SportParams
from models import Sport
from models import Event
from models import Match
from models import Bet
from models import Choice

from google.appengine.ext import ndb

from settings import WEB_CLIENT_ID

from sports.XMLOddsParser import parseXMLOdds, beautify
from __builtin__ import setattr

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

MULTIPLY_RESOURCE = endpoints.ResourceContainer(
    sportCode=messages.StringField(1, required = False),
    leagueCode=messages.StringField(2, required = False),
    matchCode=messages.StringField(3, required = False)
)

class Hello(messages.Message):
    """String that stores a message."""
    greeting = messages.StringField(1)


@endpoints.api( name='tipsters', version='v1', allowed_client_ids=[WEB_CLIENT_ID, API_EXPLORER_CLIENT_ID], scopes=[EMAIL_SCOPE])
class TipstersApi(remote.Service):
    """TipstersApi API v0.1"""
    
    sports = parseXMLOdds()
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "sayHello", http_method='GET', name = "sayHello")
    def say_hello(self, request):
        return Hello(greeting="Hello World")
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "populateOdds", http_method='POST', name = "populateOdds")
    def populate_odds(self, request):
        sportNames = ["Formula 1", "Basketball", "Motorcycling" ]
        #sportNames = ["Formula 1"]
        sports = filter(lambda s: s["name"] in sportNames, self.sports)
        for sport in sports:
            self.insertSport(sport)
            
        return Hello(greeting="Success")
    
    # @param parent - parent array data
    # @param parentKey - parent datastore key, used to create ancestor relationship
    # @param attr - attribute of the parent that contains the elements to insert in the datastore
    def insertElements(self, parent, parentKey, attr):
        methodName = "create" + (attr.title()[:-1])
        createChildFunc = getattr(self, methodName)
        ndb.put_multi(map( lambda child: createChildFunc(child, parent, parentKey) , parent[attr]))
    
    def createElement(self, type, element, parent, parentKey, parentIdAttribName, childsAttrib, optAttribs = [] ):
        e_key = ndb.Key(type, element["id"], parent=parentKey)
        
        if childsAttrib is not None:
            self.insertElements(element, e_key, childsAttrib)
        
        elementModel = type( key = e_key, id = element["id"], name = element["name"])
        setattr( elementModel, parentIdAttribName, parent["id"])
        for attr in optAttribs:
            setattr( elementModel, attr, element[attr])
        return elementModel
    
    def insertSport(self, sport):
        s_key = ndb.Key(Sport, sport["id"])
        self.insertElements(sport, s_key, "events")
        Sport(key = s_key, id = sport["id"], name = sport["name"]).put()
        
    def createEvent(self, event, sport, sportKey):
        return self.createElement(Event, event, sport, sportKey, "sportId", "matches")
        
    def createMatche(self, match, event, eventKey):
        return self.createElement(Match, match, event, eventKey, "eventId", "bets", ["start_date"])
        
    def createBet(self, bet, match, matchKey):
        return self.createElement(Bet, bet, match, matchKey, "matchId", "choices")

    def createChoice(self, choice, bet, betKey):
        return self.createElement(Choice, choice, bet, betKey, "betId", None, ["odd"])
    
    
    @endpoints.method(SportParams, SportMessage, path = "getOdds", http_method='GET', name = "getOdds")
    def getOdds(self, request):
        
        sportCode, leagueCode, matchCode = request.sportCode, request.leagueCode, request.matchCode
        
        if (matchCode is not None) and (sportCode is not None):
            response = self.getMatchOdds(self.sports, sportCode, leagueCode, matchCode)
        elif (leagueCode is not None) and (sportCode is not None):
            response = self.getLeagueOdds(self.sports, sportCode, leagueCode)
        else:
            response = self.getSportOdds(self.sports, sportCode)

        return response
    
    def getMatchOdds(self, sportsData, sportCode, leagueCode, matchCode):
        sport = self.filterById(sportsData, sportCode)
        event = self.filterById(sport["events"], leagueCode)
        match = self.filterById(event["matches"], matchCode)
        
        bets = self.getMatchBets(match)
        match = MatchMessage(name = match["name"], id = match["id"], start_date = match["start_date"], bets=bets)
        event = EventMessage(name=event["name"], id=event["id"], matches=[match])
        return SportMessage(name=sport["name"], id=sport["id"], events=[event])
    
    def getMatchBets(self, match):
        return map(lambda bet: 
                    BetMessage(name = bet["name"], id = bet["id"], code = bet["code"], choices = self.getBetChoices(bet))
                   , match["bets"])
            
    def getBetChoices(self, bet):
        return map(lambda choice: ChoiceMessage(name=choice["name"], id=choice["id"], odd=choice["odd"]), bet["choices"])
        
    def getSpecialBets(self, match):
        specialBets = ["Relegation", "Place 1-4", "Outright Winner", "Drivers Championship Winner", "Constructors Championship", "Winner"]
        bets = []
        for betName in specialBets:
            try:
                bets += [self.filterByAttr(match["bets"], "name", betName)]
            except TipstersApi.EventNotFoundException: pass
        return map( lambda bet: BetMessage(name = bet["name"], id = bet["id"], code = bet["code"]) ,bets)
            
    #get the main bets
    def getMainBets(self, sportCode, match):
        mainBets = {"1" : "Match Result", "2" : "Match Winner", "4" : "Match Winner"}
        if sportCode in mainBets:            
            try:
                bet = self.filterByAttr(match["bets"], "name", mainBets[sportCode])
                return [BetMessage(name = bet["name"], id = bet["id"], code = bet["code"], choices = self.getBetChoices(bet))]
            except TipstersApi.EventNotFoundException: pass
        return self.getSpecialBets(match)
        
    def getLeagueOdds(self, sportsData, sportCode, leagueCode):
        sport = self.filterById(sportsData, sportCode)
        event = self.filterById(sport["events"], leagueCode)
                
        matches = map(lambda match: MatchMessage(name = match["name"], id = match["id"], start_date = match["start_date"], bets = self.getMainBets(sportCode, match)), event["matches"])
        event = EventMessage(name=event["name"], id=event["id"], matches=matches)
        return SportMessage(name=sport["name"], id=sport["id"], events=[event])
    
    def getSportOdds(self, sportsData, sportCode):
        if sportCode is None: sportCode = "1"
        sportData = self.filterById(sportsData, sportCode)        
        events = map(lambda event: EventMessage(name = event["name"], id = event["id"]), sportData["events"])
        return SportMessage(name=sportData["name"], id=sportData["id"], events=events)
    
    
    def filterById(self, collection, _id):
        return self.filterByAttr(collection, "id", _id)
        
    def filterByAttr(self, collection, attrName, attrVal):
        data = filter(lambda elem: elem[attrName] == attrVal , collection)
        if data:
            return data[0]
        else:
            raise TipstersApi.EventNotFoundException("Event queried does not exist")
        
    class EventNotFoundException(Exception):
        pass
# registers API
api = endpoints.api_server([TipstersApi]) 
