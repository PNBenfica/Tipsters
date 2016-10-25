#!/usr/bin/env python

"""models.py

Udacity conference server-side Python App Engine data & ProtoRPC models

$Id: models.py,v 1.1 2014/05/24 22:01:10 wesc Exp $

created/forked from conferences.py by wesc on 2014 may 24

"""

from protorpc import messages
from google.appengine.ext import ndb

class User(ndb.Model):
    email = ndb.StringProperty()
    pwd = ndb.StringProperty()
    
class UserCreationForm(messages.Message):
    name = messages.StringField(1, required=True)
    email = messages.StringField(2, required=True)
    pwd = messages.StringField(3, required=True)
    
class UserForm(messages.Message):
    name = messages.StringField(1)
    email = messages.StringField(2)
    
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
    
    