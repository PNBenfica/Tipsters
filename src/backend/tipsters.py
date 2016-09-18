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

from google.appengine.ext import ndb
from google.appengine.api import taskqueue

from settings import WEB_CLIENT_ID

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
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "sayHello", http_method='GET', name = "sayHello")
    def say_hello(self, request):
        return Hello(greeting="Hello World")
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "populateOdds", http_method='POST', name = "populateOdds")
    def populate_odds(self, request):        
        taskqueue.add(
            url='/tasks/populate_odds'
        )    
        return Hello(greeting="Success")
    
    
    @endpoints.method(SportParams, SportMessage, path = "getOdds", http_method='GET', name = "getOdds")
    def getOdds(self, request):
        
        sportCode, leagueCode, matchCode = request.sportCode, request.leagueCode, request.matchCode
        
        if (matchCode is not None) and (sportCode is not None):
            response = self.getMatchOdds(sportCode, leagueCode, matchCode)
        elif (leagueCode is not None) and (sportCode is not None):
            response = self.getLeagueOdds(sportCode, leagueCode)
        else:
            response = self.getSportOdds(sportCode)

        return response
    
    
    def fetchElement(self, modelClass, code, parentKey = None):
        key = ndb.Key(modelClass, code, parent=parentKey)
        return key, key.get()
    
    
    def getMatchOdds(self, sportCode, eventCode, matchCode):
        sportKey, sport = self.fetchElement(Sport, sportCode)
        eventKey, event = self.fetchElement(Event, eventCode, sportKey)
        matchKey, match = self.fetchElement(Match, matchCode, eventKey)

        bets = self.getMatchBets(matchKey)
        return self.createMatchMessage(sport, event, match, bets)
    
    def getMatchBets(self, matchKey):
        bets = Bet.query(ancestor=matchKey)
        return map(lambda bet: BetMessage(name = bet.name, id = bet.id, choices = self.getBetChoices(bet)), bets)
            
    def getBetChoices(self, bet):        
        return map(lambda choice: ChoiceMessage(name=choice["name"], id=choice["id"], odd=choice["odd"]), bet.choices)
        
    def getSpecialBets(self, bets):
        specialBets = ["Relegation", "Place 1-4", "Outright Winner", "Place 1-2", "Drivers Championship Winner", "Constructors Championship", "Winner", "Winning Team"]
        bets = bets.filter(Bet.name.IN(specialBets))        
        return map(lambda bet: BetMessage(name = bet.name, id = bet.id), bets)

    def getMainBets(self, sportCode, matchCode, eventKey):
        mainBets = {"1" : "Match Result", "2" : "Match Winner", "4" : "Match Winner"}
        matchKey = ndb.Key(Match, matchCode, parent = eventKey)
        bets = Bet.query(ancestor=matchKey)
        if sportCode in mainBets:            
            bet = bets.filter(ndb.GenericProperty("name") == mainBets[sportCode]).get()
            if bet:
                return [BetMessage(name = bet.name, id = bet.id, choices = self.getBetChoices(bet))]
        return self.getSpecialBets(bets)
        
    def getLeagueOdds(self, sportCode, eventCode):
        sportKey, sport = self.fetchElement(Sport, sportCode)
        eventKey, event = self.fetchElement(Event, eventCode, sportKey)
        
        matches = Match.query(ancestor=eventKey).order(Match.start_date)
        matches = map(lambda match: MatchMessage(name = match.name, id = match.id, start_date = match.start_date, bets = self.getMainBets(sportCode, match.id, eventKey)), matches)
        
        return self.createEventMessage(sport, event, matches)
    
    def getSportOdds(self, sportCode):        
        sportKey, sport = self.fetchElement(Sport, sportCode)
        events = Event.query(ancestor=sportKey)
        events = map(lambda event: EventMessage(name = event.name, id = event.id), events)
        return self.createSportMessage(sport, events)
    
    def createMatchMessage(self, sport, event, match, bets):
        match = MatchMessage(name = match.name, id = match.id, start_date = match.start_date, bets=bets)
        return self.createEventMessage(sport, event, [match])
    
    def createEventMessage(self, sport, event, matches):
        event = EventMessage(name=event.name, id=event.id, matches=matches)
        return self.createSportMessage(sport, [event])
    
    def createSportMessage(self, sport, events):
        return SportMessage(name=sport.name, id=sport.id, events=events)
    
# registers API
api = endpoints.api_server([TipstersApi]) 
