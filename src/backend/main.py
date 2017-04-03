#!/usr/bin/env python

"""
main.py -- Tipsters server-side Python App Engine
    HTTP controller handlers for memcache & task queue access

"""

import webapp2
from google.appengine.api import taskqueue

from sports.sportsPopulator import populate_odds
from DatastorePopulator import populate_datastore

class PopulateDatastore(webapp2.RequestHandler):
    def post(self):
        populate_datastore()    
        
class PopulateOdds(webapp2.RequestHandler):
    def post(self):
        populate_odds()
        
app = webapp2.WSGIApplication([
    ('/tasks/populate_datastore', PopulateDatastore),
    ('/tasks/populate_odds', PopulateOdds),
], debug=True)
