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


from models import SportMessage, SportParams, UserForm, UserCreationForm, UserMiniForm, PostForm, Post, PostMessage, User
from settings import WEB_CLIENT_ID
from sports.sportsRetriever import get
import SessionManager
import UserManager
from gaeUtils import getKeyByAncestors


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
        #getMatchValidator("1", "3", "1181299").updateMatchResults({"Full_time_goals": [2,0], "Half_time_goals": [0,0], "First_team_to_score": "No Goal", "Goalscorers":{"first":"211432922", "last":"211432754", "all":["211434234","211434230"], "firstEligibles": ["211432918", "211432914", "211432922"], "lastEligibles": ["211432754", "211432750", "211432746"], "anytimeEligibles":["211434234", "211434230", "211434226"]}})
        #getMatchValidator("2", "239", "1221474").updateMatchResults({"Sets": [[1,6],[0,6],[6,0]]})
        #getMatchValidator("4", "20381", "1221980").updateMatchResults({"Result": [70,70], "OT-result": [84,92]})
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
        data = {field.name: getattr(request, field.name) for field in request.all_fields()}
        data['nComments'] = data['nLikes'] = 0
        data['date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        user_key = ndb.Key(User, "paulo")
        post_id = Post.allocate_ids(size=1, parent=user_key)[0]
        post_key = ndb.Key(Post, post_id, parent=user_key)
        data['key'] = post_key
        data['author'] = "paulo"

        # create Conference, send email to organizer confirming
        # creation of Conference & return (modified) ConferenceForm
        Post(**data).put()
        return Hello(greeting="post success")
    
    @endpoints.method(POST_GET_REQUEST, PostMessage, path = "getPost", http_method='Get', name = "getPost")
    def get_post(self, request):
        post = ndb.Key(urlsafe=request.post_id).get()
        return UserManager.toPostMessage(post)
    
# registers API
api = endpoints.api_server([TipstersApi]) 
