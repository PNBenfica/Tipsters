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


from models import SportMessage, SportParams, UserForm, UserCreationForm, UserMiniForm, PostForm, PostMessage, User
from settings import WEB_CLIENT_ID
from sports.sportsRetriever import get
import PostManager
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

COMMENT_POST_REQUEST = endpoints.ResourceContainer(
    post_id=messages.StringField(1),
    comment=messages.StringField(2),
)

FOLLOW_USER_REQUEST = endpoints.ResourceContainer(
    userToFollow=messages.StringField(1),
)

UPDATE_USER_PHOTO_REQUEST = endpoints.ResourceContainer(
    photo_bytes=messages.BytesField(1)
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
    
    @endpoints.method(UserCreationForm, Hello, path = "users", http_method='POST', name = "registerUser")
    def register_user(self, request):
        name, email, pwd = request.name, request.email, request.pwd
        UserManager.register_user(name, email, pwd)
        return Hello(greeting="User sucessful created")
    
    @endpoints.method(UPDATE_USER_PHOTO_REQUEST, Hello, path = "updatePhoto", http_method='POST', name = "updatePhoto")
    def update_photo(self, request):
        user = SessionManager.get_current_user()
        user.avatar = request.photo_bytes
        user.put()
        return Hello(greeting="photo successful updated")
    
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
        user_key = ndb.Key(User, "paulo") # must change to get user from token        
        PostManager.storePost(user_key, request)
        
        return Hello(greeting="post success")        
    
    @endpoints.method(POST_GET_REQUEST, PostMessage, path = "getPost", http_method='Get', name = "getPost")
    def get_post(self, request):
        return PostManager.getPostMessage(request.post_id)
    
    @endpoints.method(COMMENT_POST_REQUEST, Hello, path = "addComment", http_method='Post', name = "addComment")
    def add_comment(self, request):
        PostManager.addCommentToPost("paulo", request.post_id, request.comment)
        
        return Hello(greeting="comment added") 
    
# registers API
api = endpoints.api_server([TipstersApi]) 
