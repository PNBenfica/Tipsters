#!/usr/bin/env python

"""models.py

Udacity conference server-side Python App Engine data & ProtoRPC models

$Id: models.py,v 1.1 2014/05/24 22:01:10 wesc Exp $

created/forked from conferences.py by wesc on 2014 may 24

"""

from protorpc import messages
from google.appengine.ext import ndb


class TipModel(ndb.Model):
    choiceId = ndb.StringProperty()
    odd = ndb.FloatProperty()
    
class Post(ndb.Model):
    author = ndb.StringProperty()
    comment = ndb.StringProperty()
    nComments = ndb.IntegerProperty()
    nLikes = ndb.IntegerProperty()
    likesUsersKeys = ndb.StringProperty(repeated=True)
    date = ndb.StringProperty()
    tips = ndb.KeyProperty(repeated=True, kind=TipModel)
    totalOdd = ndb.FloatProperty()
    
class PostComment(ndb.Model):
    author = ndb.StringProperty()
    comment = ndb.StringProperty()
    date = ndb.StringProperty()

class PostForm(messages.Message):
    comment = messages.StringField(1, required=True)
    tips = messages.MessageField('TipForm',2,repeated=True)
    
class TipForm(messages.Message):
    sportId = messages.StringField(1)
    leagueId = messages.StringField(2)
    matchId = messages.StringField(3)
    betId = messages.StringField(4)
    choiceId = messages.StringField(5)
    
    odd = messages.FloatField(6)
    sportName = messages.StringField(7)
    leagueName = messages.StringField(8)
    matchName = messages.StringField(9)
    betName = messages.StringField(10)
    choiceName = messages.StringField(11)
    
    status = messages.StringField(12)
    
class PostMessage(messages.Message):
    tipster = messages.MessageField('UserMiniForm',1)
    comment = messages.StringField(2)
    nComments = messages.IntegerField(3)
    nLikes = messages.IntegerField(4)
    liked = messages.BooleanField(5)
    date = messages.StringField(6)
    websafeKey = messages.StringField(7)
    tips = messages.MessageField('TipForm',8,repeated=True)
    comments = messages.MessageField('PostCommentMessage',9,repeated=True)
    totalOdd = messages.FloatField(10)

class PostCommentMessage(messages.Message):
    tipster = messages.MessageField('UserMiniForm',1)
    comment = messages.StringField(2)
    date = messages.StringField(3)
    
class FeedMessage(messages.Message):
    posts = messages.MessageField('PostMessage',1,repeated=True)
    

class User(ndb.Model):
    email = ndb.StringProperty()
    pwd = ndb.StringProperty()
    avatar = ndb.BlobProperty()
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
    avatar = messages.StringField(6)
    
    
class UserMiniForm(messages.Message):
    name = messages.StringField(1)
    avatar = messages.StringField(2)
    
class UserAuthForm(messages.Message):
    name = messages.StringField(1)
    email = messages.StringField(2)
    pwd = messages.StringField(3)


class TrendsMessage(messages.Message):
    users = messages.MessageField('TrendUserMessage',1,repeated=True)

class TrendUserMessage(messages.Message):
    tipster = messages.MessageField('UserMiniForm',1)
    description = messages.StringField(2)

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
