#!/usr/bin/env python

"""models.py

Udacity conference server-side Python App Engine data & ProtoRPC models

$Id: models.py,v 1.1 2014/05/24 22:01:10 wesc Exp $

created/forked from conferences.py by wesc on 2014 may 24

"""

from protorpc import messages
from google.appengine.ext import ndb


class Post(ndb.Model):
    author = ndb.StringProperty()
    comment = ndb.StringProperty()
    nComments = ndb.IntegerProperty()
    nLikes = ndb.IntegerProperty()
    date = ndb.StringProperty()

class PostForm(messages.Message):
    comment = messages.StringField(1, required=True) 

class PostMessage(messages.Message):
    author = messages.StringField(1)
    comment = messages.StringField(2)
    nComments = messages.IntegerField(3)
    nLikes = messages.IntegerField(4)
    date = messages.StringField(5)
    websafeKey = messages.StringField(11)

class User(ndb.Model):
    email = ndb.StringProperty()
    pwd = ndb.StringProperty()
    followersKeys = ndb.StringProperty(repeated=True)
    followingKeys = ndb.StringProperty(repeated=True)
    authToken = ndb.StringProperty()
    authTokenDate = ndb.StringProperty()
    
class UserCreationForm(messages.Message):
    name = messages.StringField(1, required=True)
    email = messages.StringField(2, required=True)
    pwd = messages.StringField(3, required=True)
    
class UserForm(messages.Message):
    name = messages.StringField(1)
    email = messages.StringField(2)
    followers = messages.MessageField('UserMiniForm',3,repeated=True)
    following = messages.MessageField('UserMiniForm',4,repeated=True)
    posts = messages.MessageField('PostMessage',5,repeated=True)
    
class UserMiniForm(messages.Message):
    name = messages.StringField(1)
    email = messages.StringField(2)
    pwd = messages.StringField(3)
    
class SportModel(ndb.Model):
    name = ndb.StringProperty()
    id = ndb.StringProperty()

class EventModel(ndb.Model):
    name = ndb.StringProperty()
    id = ndb.StringProperty()
    sportId = ndb.StringProperty()
    
class MatchModel(ndb.Model):
    name = ndb.StringProperty()
    id = ndb.StringProperty()
    start_date = ndb.StringProperty()
    eventId = ndb.StringProperty()
    status = ndb.StringProperty()
    
class BetModel(ndb.Model):
    name = ndb.StringProperty()
    id = ndb.StringProperty()
    matchId = ndb.StringProperty()
    choices = ndb.JsonProperty()

#class ChoiceModel(ndb.Model):
#    name = ndb.StringProperty()
#    id = ndb.StringProperty()
#    odd = ndb.StringProperty()
#    betId = ndb.StringProperty()
    
    
class SportParams(messages.Message):
    sportCode = messages.StringField(1, required = False)
    leagueCode = messages.StringField(2, required = False)
    matchCode = messages.StringField(3, required = False)


class SportMessage(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    events = messages.MessageField('EventMessage',3,repeated=True)

class EventMessage(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    matches = messages.MessageField('MatchMessage',3,repeated=True)

class MatchMessage(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    start_date = messages.StringField(3)
    status = messages.StringField(4)
    bets = messages.MessageField('BetMessage',5,repeated=True)

class BetMessage(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    code = messages.StringField(3)
    choices = messages.MessageField('ChoiceMessage',4,repeated=True)

class ChoiceMessage(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    odd = messages.StringField(3)
    status = messages.StringField(4)
    postsKeys = messages.StringField(5, repeated=True)
