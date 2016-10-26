#!/usr/bin/env python

"""
tipsters.py -- tipsters server-side Python App Engine API;
    uses Google Cloud Endpoints
"""


import os

import endpoints
from google.appengine.api import taskqueue
from google.appengine.ext import ndb
from protorpc import message_types
from protorpc import messages
from protorpc import remote
import datetime
from Crypto.Random import random


from models import SportMessage, SportParams, User, UserForm, UserCreationForm, UserMiniForm
from settings import WEB_CLIENT_ID
from sports.sportsRetriever import get


EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

USER_GET_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
)

FOLLOW_USER_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
    userToFollow=messages.StringField(2),
)

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class Hello(messages.Message):
    """String that stores a message."""
    greeting = messages.StringField(1)
    code = messages.IntegerField(2)


@endpoints.api( name='tipsters', version='v1', allowed_client_ids=[WEB_CLIENT_ID, API_EXPLORER_CLIENT_ID], scopes=[EMAIL_SCOPE])
class TipstersApi(remote.Service):
    """TipstersApi API v0.1"""    
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "sayHello", http_method='GET', name = "sayHello")
    def say_hello(self, request):
        #getMatchValidator("1", "3", "1181299").updateMatchResults({"Full_time_goals": [2,0], "Half_time_goals": [0,0], "First_team_to_score": "No Goal", "Goalscorers":{"first":"211432922", "last":"211432754", "all":["211434234","211434230"], "firstEligibles": ["211432918", "211432914", "211432922"], "lastEligibles": ["211432754", "211432750", "211432746"], "anytimeEligibles":["211434234", "211434230", "211434226"]}})
        #getMatchValidator("2", "239", "1221474").updateMatchResults({"Sets": [[1,6],[0,6],[6,0]]})
        #getMatchValidator("4", "20381", "1221980").updateMatchResults({"Result": [70,70], "OT-result": [84,92]})
        return Hello(greeting="Hello World")
    
    @endpoints.method(UserCreationForm, Hello, path = "registerUser", http_method='POST', name = "registerUser")
    def register_user(self, request):
        name, email, pwd = request.name, request.email, request.pwd
        
        if self._userAlreadyExist(name):
            raise endpoints.BadRequestException("Username already exists")
        if self._emailAlreadyExist(email):
            raise endpoints.BadRequestException("Email already being used")
            
        User(id=name, email=email, pwd=pwd).put()
        return Hello(greeting="User sucessful created ")
    
    @endpoints.method(USER_GET_REQUEST, UserForm, path = "getUser", http_method='GET', name = "getUser")
    def get_user(self, request):
        username = request.username        
        user = self._getUser(username)
        followers = map(self._toUserMiniForm ,self._getFollowers(user))
        following = map(self._toUserMiniForm ,self._getFollowing(user))

        return UserForm(name=username, email=user.email, followers=followers, following=following)
    
    @endpoints.method(FOLLOW_USER_REQUEST, Hello, path = "followUser", http_method='POST', name = "followUser")
    def follow_user(self, request):
        username, userToFollowName = request.username, request.userToFollow
        user = self.get_current_user()
        userToFollow = self._getUser(userToFollowName)
        
        if userToFollowName not in user.followingKeys:
            user.followingKeys.append(userToFollowName)
            userToFollow.followersKeys.append(username)
            
            user.put()
            userToFollow.put()

        return Hello(greeting=username + " following " + userToFollowName)
        
    def get_current_user(self):
        authToken = self.request_state.headers.get('authorization')
        
        user = self._getUserByToken(authToken)
        
        if user and self._isTokenValid(user.authTokenDate):
            return user
        else:
            raise endpoints.UnauthorizedException("Not logged in")
        
    def _isTokenValid(self, tokenCreationDate):
        tokenDate = datetime.datetime.strptime(tokenCreationDate, "%Y-%m-%d %H:%M:%S")
        expiringDate = tokenDate + datetime.timedelta(days=1)
        return datetime.datetime.now() < expiringDate
    
    def _getUser(self, username):
        user = ndb.Key(User, username).get()
        if not user:
            raise endpoints.NotFoundException(username)
        else:
            return user
    
    def _getUserByToken(self, token):
        return User.query(ndb.GenericProperty("authToken") == token).get()
    
    def _userAlreadyExist(self, username):
        return ndb.Key(User, username).get()
    
    def _emailAlreadyExist(self, email):
        return User.query(ndb.GenericProperty("email") == email).get()
    
    def _getFollowers(self, user):
        followersKeys = [ndb.Key(User, followerName) for followerName in user.followersKeys]
        return ndb.get_multi(followersKeys)
    
    def _getFollowing(self, user):
        followingKeys = [ndb.Key(User, followingName) for followingName in user.followingKeys]
        return ndb.get_multi(followingKeys)
    
    def _toUserMiniForm(self, user):
        return UserMiniForm(name=user.key.id(), email=user.email)
    
    @endpoints.method(UserMiniForm, Hello, path = "login", http_method='POST', name = "login")
    def login(self, request):
        username, pwd = request.name, request.pwd
        user = self._getUser(username)
        
        if user.pwd == pwd:
            token = self._generateAuthToken()
            self._updateAuthToken(user, token)
            return Hello(greeting=token)
        else:
            return Hello(greeting="Bad login", code=5001)
    
    def _generateAuthToken(self):
        """ Generate a 32-char alnum string. 190 bits of entropy. """
        alnum = ''.join(c for c in map(chr, range(256)) if c.isalnum())
        return ''.join(random.choice(alnum) for _ in range(32))
    
    def _updateAuthToken(self, user, token):
        user.authToken = token
        user.authTokenDate = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        user.put()        
    
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
