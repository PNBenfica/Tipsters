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


from models import SportMessage, SportParams, UserForm, UserCreationForm, TrendsMessage, UserAuthForm, PostForm, PostMessage, FeedMessage, User, PostCommentMessage
from settings import WEB_CLIENT_ID
from sports.sportsRetriever import get
import PostManager
import SessionManager
import UserManager
from endpoints.api_exceptions import UnauthorizedException

from DatastorePopulator import populate_datastore

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

USER_GET_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
)

POST_GET_REQUEST = endpoints.ResourceContainer(
    post_id=messages.StringField(1),
)

COMMENT_POST_REQUEST = endpoints.ResourceContainer(
    PostCommentMessage,
    post_id=messages.StringField(1)
)

FOLLOW_USER_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
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
        return Hello(greeting="User successful created")
    
    @endpoints.method(UserForm, Hello, path = "users", http_method='PUT', name = "updateUserProfile")
    def update_user_profile(self, request):
        user = SessionManager.get_current_user()
        user.avatar = request.avatar
        print(request.avatar)
        user.put()
        return Hello(greeting="profile successful updated")
    
    @endpoints.method(USER_GET_REQUEST, UserForm, path = "users/{username}", http_method='GET', name = "getUserProfile")
    def get_user(self, request):
        return UserManager.getUserProfile(request.username)
    
    @endpoints.method(FOLLOW_USER_REQUEST, Hello, path = "users/follow/{username}", http_method='POST', name = "followUser")
    def follow_user(self, request):
        user = SessionManager.get_current_user()
        UserManager.follow_user(user, request.username)
        return Hello(greeting="Successful added to the followers list")
    
    @endpoints.method(FOLLOW_USER_REQUEST, Hello, path = "users/follow/{username}", http_method='DELETE', name = "unfollowUser")
    def unfollow_user(self, request):
        user = SessionManager.get_current_user()
        UserManager.unfollow_user(user, request.username)
        return Hello(greeting="Successful removed from the followers list")
    
    
    @endpoints.method(UserAuthForm, Hello, path = "authenticate", http_method='POST', name = "login")
    def authenticate(self, request):
        username, pwd = request.name, request.pwd
        user = UserManager.getUser(username)
        
        if UserManager.checkPassword(user, pwd):
            token = SessionManager.generateAuthToken()
            UserManager.updateAuthToken(user, token)
            return Hello(greeting=token)
        else:
            raise UnauthorizedException("Invalid credentials")
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "populate", http_method='POST', name = "populate")
    def populate_datastore(self, request):
        
        populate_datastore()         
#         taskqueue.add(url='/tasks/populate_datastore')          
        return Hello(greeting="Starting populating datastore task...")
    
    @endpoints.method(message_types.VoidMessage, Hello, path = "populateOdds", http_method='POST', name = "populateOdds")
    def populate_odds(self, request):        
        taskqueue.add(url='/tasks/populate_odds')          
        return Hello(greeting="Starting populating odds task...")
    
    
    @endpoints.method(SportParams, SportMessage, path = "sports/odds", http_method='GET', name = "getOdds")
    def get_odds(self, request):        
        sportCode, leagueCode, matchCode = request.sportCode, request.leagueCode, request.matchCode     
        sport = get(sportCode, leagueCode, matchCode)
        return sport.toMessage()
    
    
    @endpoints.method(PostForm, Hello, path = "users/posts", http_method='Post', name = "addPost")
    def add_post(self, request):        
        user_key = ndb.Key(User, "Aimar Bernardo") # must change to get user from token        
        PostManager.storePost(user_key, request)
        
        return Hello(greeting="post successfully created")        
    
    @endpoints.method(message_types.VoidMessage, FeedMessage, path = "users/posts", http_method='Get', name = "getFeed")
    def get_feed(self, request):
        user = SessionManager.get_current_user()
        return PostManager.getFeed(user)
    
    @endpoints.method(POST_GET_REQUEST, PostMessage, path = "users/posts/{post_id}", http_method='Get', name = "getPost")
    def get_post(self, request):
        user = SessionManager.get_current_user()
        return PostManager.getPostMessage(user, request.post_id)
    
    @endpoints.method(COMMENT_POST_REQUEST, Hello, path = "users/posts/{post_id}/comment", http_method='Post', name = "addComment")
    def add_comment(self, request):
        print(request.post_id)
        PostManager.addCommentToPost("Aimar Bernardo", request.post_id, request.comment)
        
        return Hello(greeting="comment added")
    
    @endpoints.method(POST_GET_REQUEST, Hello, path = "users/posts/{post_id}/like", http_method='Post', name = "likePost")
    def like_post(self, request):
        print( "post_id: "+ request.post_id)
        user = SessionManager.get_current_user()
        PostManager.likePost(user, request.post_id)
        
        return Hello(greeting="liked post")
    
    @endpoints.method(message_types.VoidMessage, TrendsMessage, path = "trends", http_method='Get', name = "fetchTrends")
    def fetchTrends(self, request):
        user = SessionManager.get_current_user()
        return UserManager.getTrends(user)
    
# registers API
api = endpoints.api_server([TipstersApi]) 
