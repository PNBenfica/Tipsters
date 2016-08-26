#!/usr/bin/env python

"""models.py

Udacity conference server-side Python App Engine data & ProtoRPC models

$Id: models.py,v 1.1 2014/05/24 22:01:10 wesc Exp $

created/forked from conferences.py by wesc on 2014 may 24

"""

__author__ = 'wesc+api@google.com (Wesley Chun)'

import httplib
import endpoints
from protorpc import messages
from google.appengine.ext import ndb


class Profile(ndb.Model):
    """Profile -- User profile object"""
    displayName = ndb.StringProperty()
    mainEmail = ndb.StringProperty()
    teeShirtSize = ndb.StringProperty(default='NOT_SPECIFIED')


class ProfileMiniForm(messages.Message):
    """ProfileMiniForm -- update Profile form message"""
    displayName = messages.StringField(1)
    teeShirtSize = messages.EnumField('TeeShirtSize', 2)


class Sport(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    events = messages.MessageField('Event',3,repeated=True)

class Event(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    matches = messages.MessageField('Match',3,repeated=True)

class Match(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    start_date = messages.StringField(3)
    bets = messages.MessageField('Bet',4,repeated=True)

class Bet(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    code = messages.StringField(3)
    choices = messages.MessageField('Choice',4,repeated=True)

class Choice(messages.Message):
    name = messages.StringField(1)
    id = messages.StringField(2)
    odd = messages.StringField(3)
    

class ProfileForm(messages.Message):
    """ProfileForm -- Profile outbound form message"""
    displayName = messages.StringField(1)
    mainEmail = messages.StringField(2)
    teeShirtSize = messages.EnumField('TeeShirtSize', 3)


class TeeShirtSize(messages.Enum):
    """TeeShirtSize -- t-shirt size enumeration value"""
    NOT_SPECIFIED = 1
    XS_M = 2
    XS_W = 3
    S_M = 4
    S_W = 5
    M_M = 6
    M_W = 7
    L_M = 8
    L_W = 9
    XL_M = 10
    XL_W = 11
    XXL_M = 12
    XXL_W = 13
    XXXL_M = 14
    XXXL_W = 15
