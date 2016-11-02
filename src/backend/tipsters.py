#!/usr/bin/env python

"""
tipsters.py -- tipsters server-side Python App Engine API;
    uses Google Cloud Endpoints
"""


import endpoints
from google.appengine.api import taskqueue
from google.appengine.ext import ndb
from protorpc import message_types
from protorpc import messages
from protorpc import remote
from datetime import datetime


from models import SportMessage, SportParams, UserForm, UserCreationForm, UserMiniForm, PostForm, Post, PostMessage, TipModel, User
from settings import WEB_CLIENT_ID
from sports.sportsRetriever import get, getBetKey
import SessionManager
import UserManager


EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

USER_GET_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
)

POST_GET_REQUEST = endpoints.ResourceContainer(
    post_id=messages.StringField(1),
)

FOLLOW_USER_REQUEST = endpoints.ResourceContainer(
    userToFollow=messages.StringField(1),
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
        
        return Hello(greeting="Hello World")
    
    @endpoints.method(UserCreationForm, Hello, path = "registerUser", http_method='POST', name = "registerUser")
    def register_user(self, request):
        name, email, pwd = request.name, request.email, request.pwd
        UserManager.register_user(name, email, pwd)
        return Hello(greeting="User sucessful created")
    
    @endpoints.method(USER_GET_REQUEST, UserForm, path = "getUser", http_method='GET', name = "getUser")
    def get_user(self, request):
        return UserManager.getUserProfile(request.username)
    
    @endpoints.method(FOLLOW_USER_REQUEST, Hello, path = "followUser", http_method='POST', name = "followUser")
    def follow_user(self, request):
        user = SessionManager.get_current_user()
        UserManager.follow_user(user, request.userToFollow)
        return Hello(greeting="Success")
    
    @endpoints.method(FOLLOW_USER_REQUEST, Hello, path = "unfollowUser", http_method='POST', name = "unfollowUser")
    def unfollow_user(self, request):
        user = SessionManager.get_current_user()
        UserManager.unfollow_user(user, request.userToFollow)
        return Hello(greeting="Success")
    
    
    @endpoints.method(UserMiniForm, Hello, path = "login", http_method='POST', name = "login")
    def login(self, request):
        username, pwd = request.name, request.pwd
        user = UserManager.getUser(username)
        
        if UserManager.checkPassword(user, pwd):
            token = SessionManager.generateAuthToken()
            UserManager.updateAuthToken(user, token)
            return Hello(greeting=token)
        else:
            return Hello(greeting="Bad login", code=5001)
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "populateOdds", http_method='POST', name = "populateOdds")
    def populate_odds(self, request):        
        taskqueue.add(url='/tasks/populate_odds')          
        return Hello(greeting="Starting populating odds task...")
    
    
    @endpoints.method(SportParams, SportMessage, path = "getOdds", http_method='GET', name = "getOdds")
    def getOdds(self, request):        
        sportCode, leagueCode, matchCode = request.sportCode, request.leagueCode, request.matchCode     
        sport = get(sportCode, leagueCode, matchCode)
        return sport.toMessage()
    
    
    @endpoints.method(PostForm, Hello, path = "addPost", http_method='Post', name = "addPost")
    def add_post(self, request):
        data = {'comment': request.comment}
        data['nComments'] = data['nLikes'] = 0
        data['date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        user_key = ndb.Key(User, "paulo")
        post_id = Post.allocate_ids(size=1, parent=user_key)[0]
        post_key = ndb.Key(Post, post_id, parent=user_key)
        data['key'] = post_key
        data['author'] = "paulo"
        data['tips'] = []
        
        for tip in request.tips:
            #data ={"sportId":"1", "leagueId":"3", "matchId":"1181299", "betId":"27152659", "choiceId":"197593702"}
            #bet = getBet(tip.sportId, tip.leagueId, tip.matchId, tip.betId)
            #bet.addTip(tip.choiceId, post_key.urlsafe())
            
            bet_key = getBetKey(tip.sportId, tip.leagueId, tip.matchId, tip.betId)
            tip_id = TipModel.allocate_ids(size=1, parent=bet_key)[0]
            tip_key = ndb.Key(TipModel, tip_id, parent=bet_key)
            data['tips'].append(tip_key)
              
            tip = { "choiceId" : tip.choiceId, "odd": 3.20, "key" : tip_key }
            TipModel(**tip).put()
        
        Post(**data).put()
        return Hello(greeting="post success")
    
    
    @endpoints.method(POST_GET_REQUEST, PostMessage, path = "getPost", http_method='Get', name = "getPost")
    def get_post(self, request):
        post = ndb.Key(urlsafe=request.post_id).get()
        return UserManager.toPostMessage(post)
    
# registers API
api = endpoints.api_server([TipstersApi]) 
