#!/usr/bin/env python

"""
main.py -- Tipsters server-side Python App Engine
    HTTP controller handlers for memcache & task queue access

"""

import webapp2
from google.appengine.api import taskqueue
from google.appengine.ext import ndb

from models import Sport
from models import Event
from models import Match
from models import Bet
from models import Choice

from sports.XMLOddsParser import parseXMLOdds


class PopulateOddsHandler(webapp2.RequestHandler):
    def post(self):
        sportNames = [ "Formula 1", "Basketball", "Motorcycling", "Tennis", "Football" ]
        #sportNames = ["Formula 1"]
        sports = parseXMLOdds()
        sports = filter(lambda s: s["name"] in sportNames, sports)
        for sport in sports:
            self.insertSport(sport)

    # @param parent - parent array data
    # @param parentKey - parent datastore key, used to create ancestor relationship
    # @param attr - attribute of the parent that contains the elements to insert in the datastore
    def insertElements(self, parent, parentKey, attr):
        methodName = "create" + (attr.title()[:-1])
        createChildFunc = getattr(self, methodName)
        ndb.put_multi(map( lambda child: createChildFunc(child, parent, parentKey) , parent[attr]))
    
    def createElement(self, type, element, parent, parentKey, parentIdAttribName, childsAttrib, optAttribs = [] ):
        e_key = ndb.Key(type, element["id"], parent=parentKey)
        
        if childsAttrib is not None:
            self.insertElements(element, e_key, childsAttrib)
        
        elementModel = type( key = e_key, id = element["id"], name = element["name"])
        setattr( elementModel, parentIdAttribName, parent["id"])
        for attr in optAttribs:
            setattr( elementModel, attr, element[attr])
        return elementModel
    
    def insertSport(self, sport):
        s_key = ndb.Key(Sport, sport["id"])
        self.insertElements(sport, s_key, "events")
        Sport(key = s_key, id = sport["id"], name = sport["name"]).put()
        
    def createEvent(self, event, sport, sportKey):
        return self.createElement(Event, event, sport, sportKey, "sportId", "matches")
        
    def createMatche(self, match, event, eventKey):
        return self.createElement(Match, match, event, eventKey, "eventId", "bets", ["start_date"])
        
    def createBet(self, bet, match, matchKey):
        b_key = ndb.Key(Bet, bet["id"], parent=matchKey)
        
        return Bet( 
                key = b_key, 
                id = bet["id"], 
                name = bet["name"], 
                choices = bet["choices"],
                matchId = match["id"])
        
    def createChoice(self, choice, bet, betKey):
        return self.createElement(Choice, choice, bet, betKey, "betId", None, ["odd"])
    
app = webapp2.WSGIApplication([
    ('/tasks/populate_odds', PopulateOddsHandler),
], debug=True)
