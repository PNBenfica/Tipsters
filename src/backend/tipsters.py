#!/usr/bin/env python

"""
tipsters.py -- tipsters server-side Python App Engine API;
    uses Google Cloud Endpoints
"""


import endpoints
from google.appengine.api import taskqueue
from protorpc import message_types
from protorpc import messages
from protorpc import remote


from models import ChatsMessage, TipsOnThisEventMessage, SearchSuggestionsMessage, NotificationsMessage, RankingsMessage, SportMessage, SportParams, UserForm, UserCreationForm, TrendsMessage, UserAuthForm, PostForm, PostMessage, FeedMessage, PostCommentMessage
from settings import WEB_CLIENT_ID
from sports.sportsRetriever import get, get_tips
import PostManager
import SessionManager
import UserManager
import NotificationsManager
import SearchManager
import ChatManager
from endpoints.api_exceptions import UnauthorizedException

from DatastorePopulator import populate_datastore

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

USER_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
)

USER_GET_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
)

GET_USER_POSTS_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
)

POST_GET_REQUEST = endpoints.ResourceContainer(
    post_id=messages.StringField(1),
)

COMMENT_POST_REQUEST = endpoints.ResourceContainer(
    PostCommentMessage,
    post_id=messages.StringField(1)
)

SEND_MESSAGE_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
    message=messages.StringField(2)
)

FOLLOW_USER_REQUEST = endpoints.ResourceContainer(
    username=messages.StringField(1),
)

UPDATE_USER_PHOTO_REQUEST = endpoints.ResourceContainer(
    photo_bytes=messages.BytesField(1)
)

NOTIFICATION_SEEN_REQUEST = endpoints.ResourceContainer(
    notification_key=messages.StringField(1),
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
        return Hello(greeting="Successful added/removed to the followers list")
    
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
    
    @endpoints.method(SportParams, TipsOnThisEventMessage, path = "sports/tips", http_method='GET', name = "getSportTips")
    def get_sport_tips(self, request):        
        sportCode, leagueCode, matchCode = request.sportCode, request.leagueCode, request.matchCode     
        tips = get_tips(sportCode, leagueCode, matchCode)
        return TipsOnThisEventMessage(tips=tips)
    
    @endpoints.method(PostForm, Hello, path = "users/posts", http_method='Post', name = "addPost")
    def add_post(self, request):        
        #user_key = ndb.Key(User, "Aimar Bernardo") # must change to get user from token 
        user = SessionManager.get_current_user()       
        post_key = PostManager.storePost(user, request)
        
        return Hello(greeting=post_key.urlsafe())        
    
    @endpoints.method(message_types.VoidMessage, FeedMessage, path = "users/posts", http_method='Get', name = "getFeed")
    def get_feed(self, request):
        user = SessionManager.get_current_user()
        return PostManager.getFeed(user)
    
    @endpoints.method(GET_USER_POSTS_REQUEST, FeedMessage, path = "users/{username}/posts", http_method='Get', name = "getUserPosts")
    def get_user_posts(self, request):
        user = SessionManager.get_current_user()
        return PostManager.getUserPosts(user, request.username)
    
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
    
    @endpoints.method(message_types.VoidMessage, RankingsMessage, path = "rankings", http_method='Get', name = "fetchRankings")
    def fetchRankings(self, request):
        return UserManager.getRankings()
    
    @endpoints.method(message_types.VoidMessage, NotificationsMessage, path = "notifications", http_method='Get', name = "fetchNotifications")
    def fetchNotifications(self, request):
        user = SessionManager.get_current_user()
        return NotificationsManager.get_notifications_message(user)
    
    #endpoint called when notification icon clicked (ex: 3 new notifications -> 0 new notifications)
    @endpoints.method(message_types.VoidMessage, Hello, path = "notifications/notnew", http_method='Post', name = "resetNewNotificationsCount")
    def reset_new_notifications_count(self, request):
        user = SessionManager.get_current_user()
        NotificationsManager.reset_new_notifications(user)
        return Hello(greeting="notifications count reseted")
    
    @endpoints.method(NOTIFICATION_SEEN_REQUEST, Hello, path = "notifications/mark_as_seen", http_method='Post', name = "markNotificationAsSeen")
    def mark_notification_as_seen(self, request):
        user = SessionManager.get_current_user()
        NotificationsManager.mark_notification_as_seen(user, request.notification_key)
        return Hello(greeting="notification marked as seen")
    
    
    @endpoints.method(message_types.VoidMessage, SearchSuggestionsMessage, path = "search/suggestions", http_method='Get', name = "fetchSearchSuggestions")
    def fetch_search_suggestions(self, request):
        suggestions = SearchManager.fetch_suggestions()
        return SearchSuggestionsMessage(suggestions=suggestions)
    
    @endpoints.method(message_types.VoidMessage, ChatsMessage, path = "messages", http_method='Get', name = "fetchMessages")
    def fetch_messages(self, request):
        user = SessionManager.get_current_user()
        return ChatManager.get_chats_message(user.key.id())
    
    @endpoints.method(SEND_MESSAGE_REQUEST, Hello, path = "messages", http_method='Post', name = "sendMessage")
    def send_message(self, request):
        user = SessionManager.get_current_user()
        ChatManager.send_message(user.key.id(), request.username, request.message)
        return Hello(greeting="message sent")
    
    #endpoint called when message icon clicked (ex: 3 new messages -> 0 new notifications)
    @endpoints.method(message_types.VoidMessage, Hello, path = "messages/notnew", http_method='Post', name = "resetNewMessagesCount")
    def reset_new_messages_count(self, request):
        user = SessionManager.get_current_user()
        ChatManager.reset_new_messages(user.key.id())
        return Hello(greeting="messages count reseted")
    
    @endpoints.method(USER_REQUEST, Hello, path = "messages/mark_as_seen", http_method='Post', name = "markMessageAsSeen")
    def mark_message_as_seen(self, request):
        user = SessionManager.get_current_user()
        print request.username
        ChatManager.mark_message_as_seen(user.key.id(), request.username)
        return Hello(greeting="message marked as seen")
    
# registers API
api = endpoints.api_server([TipstersApi]) 
