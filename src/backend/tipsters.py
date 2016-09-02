#!/usr/bin/env python

"""
tipsters.py -- tipsters server-side Python App Engine API;
    uses Google Cloud Endpoints
"""


import endpoints
from protorpc import messages
from protorpc import message_types
from protorpc import remote
from models import Bet
from models import Choice
from models import Event
from models import Match
from models import Sport
import time
from settings import WEB_CLIENT_ID

from sports.XMLOddsParser import parseXMLOdds, beautify

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
    
    sports = beautify(parseXMLOdds())
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "sayHello", http_method='GET', name = "sayHello")
    def say_hello(self, request):
        return Hello(greeting="Hello World")
    
    @endpoints.method(MULTIPLY_RESOURCE, Sport, path = "getOdds", http_method='GET', name = "getOdds")
    def getOdds(self, request):
        
        start = time.time()
        print(start)
        sportCode, leagueCode, matchCode = request.sportCode, request.leagueCode, request.matchCode
        
        if (matchCode is not None) and (sportCode is not None):
            response = self.getMatchOdds(self.sports, sportCode, leagueCode, matchCode)
        elif (leagueCode is not None) and (sportCode is not None):
            response = self.getLeagueOdds(self.sports, sportCode, leagueCode)
        else:
            response = self.getSportOdds(self.sports, sportCode)
        end = time.time()
        print(end)
        print(end - start)
        return response
    
    def getMatchOdds(self, sportsData, sportCode, leagueCode, matchCode):
        sport = self.filterById(sportsData, sportCode)
        event = self.filterById(sport["events"], leagueCode)
        match = self.filterById(event["matches"], matchCode)
        
        bets = self.getMatchBets(match)
        match = Match(name = match["name"], id = match["id"], start_date = match["start_date"], bets=bets)
        event = Event(name=event["name"], id=event["id"], matches=[match])
        return Sport(name=sport["name"], id=sport["id"], events=[event])
    
    def getMatchBets(self, match):
        return map(lambda bet: 
                    Bet(name = bet["name"], id = bet["id"], code = bet["code"], choices = self.getBetChoices(bet))
                   , match["bets"])
            
    def getBetChoices(self, bet):
        return map(lambda choice: Choice(name=choice["name"], id=choice["id"], odd=choice["odd"]), bet["choices"])
        
    def getSpecialBets(self, match):
        specialBets = ["Relegation", "Place 1-4", "Outright Winner"]
        bets = []
        for betName in specialBets:
            try:
                bets += [self.filterByAttr(match["bets"], "name", betName)]
            except TipstersApi.EventNotFoundException: pass
        return map( lambda bet: Bet(name = bet["name"], id = bet["id"], code = bet["code"]) ,bets)
            
    #get the main bets
    def getMainBets(self, sportCode, match):
        mainBets = {"1" : "Match Result", "2" : "Match Winner", "4" : "Match Winner"}
        if sportCode in mainBets:            
            try:
                bet = self.filterByAttr(match["bets"], "name", mainBets[sportCode])
                return [Bet(name = bet["name"], id = bet["id"], code = bet["code"], choices = self.getBetChoices(bet))]
            except TipstersApi.EventNotFoundException: pass
        return self.getSpecialBets(match)
        
    def getLeagueOdds(self, sportsData, sportCode, leagueCode):
        sport = self.filterById(sportsData, sportCode)
        event = self.filterById(sport["events"], leagueCode)
                
        matches = map(lambda match: Match(name = match["name"], id = match["id"], start_date = match["start_date"], bets = self.getMainBets(sportCode, match)), event["matches"])
        event = Event(name=event["name"], id=event["id"], matches=matches)
        return Sport(name=sport["name"], id=sport["id"], events=[event])
    
    def getSportOdds(self, sportsData, sportCode):
        if sportCode is None: sportCode = "1"
        sportData = self.filterById(sportsData, sportCode)        
        events = map(lambda event: Event(name = event["name"], id = event["id"]), sportData["events"])
        return Sport(name=sportData["name"], id=sportData["id"], events=events)
    
    
    def filterById(self, collection, id):
        return self.filterByAttr(collection, "id", id)
        
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
