#!/usr/bin/env python

"""
tipsters.py -- tipsters server-side Python App Engine API;
    uses Google Cloud Endpoints
"""


import endpoints
from protorpc import messages
from protorpc import message_types
from protorpc import remote
from models import SportMessage, SportParams
from sports.sportsRetriever import get

from google.appengine.api import taskqueue

from settings import WEB_CLIENT_ID
from sports.MatchValidator import getMatchValidator


EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class Hello(messages.Message):
    """String that stores a message."""
    greeting = messages.StringField(1)


@endpoints.api( name='tipsters', version='v1', allowed_client_ids=[WEB_CLIENT_ID, API_EXPLORER_CLIENT_ID], scopes=[EMAIL_SCOPE])
class TipstersApi(remote.Service):
    """TipstersApi API v0.1"""    
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "sayHello", http_method='GET', name = "sayHello")
    def say_hello(self, request):
        getMatchValidator("1", "3", "1181299").updateMatchResults({"Full_time_goals": [2,0], "Half_time_goals": [0,0], "First_team_to_score": "No Goal", "Goalscorers":{"first":"211432922", "last":"211432754", "all":["211434234","211434230"], "firstEligibles": ["211432918", "211432914", "211432922"], "lastEligibles": ["211432754", "211432750", "211432746"], "anytimeEligibles":["211434234", "211434230", "211434226"]}})
        getMatchValidator("2", "239", "1221474").updateMatchResults({"Sets": [[1,6],[0,6],[6,0]]})
        getMatchValidator("4", "20381", "1221980").updateMatchResults({"Result": [70,70], "OT-result": [84,92]})
        return Hello(greeting="Hello World")
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "populateOdds", http_method='POST', name = "populateOdds")
    def populate_odds(self, request):        
        taskqueue.add(url='/tasks/populate_odds')          
        return Hello(greeting="Starting populating odds task...")
    
    
    @endpoints.method(SportParams, SportMessage, path = "getOdds", http_method='GET', name = "getOdds")
    def getOdds(self, request):        
        sportCode, leagueCode, matchCode = request.sportCode, request.leagueCode, request.matchCode     
        sport = get(sportCode, leagueCode, matchCode)
        return sport.toMessage()

# registers API
api = endpoints.api_server([TipstersApi]) 
