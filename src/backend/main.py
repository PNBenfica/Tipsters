#!/usr/bin/env python

"""
main.py -- Tipsters server-side Python App Engine
    HTTP controller handlers for memcache & task queue access

"""

import webapp2

from sports.sportsPopulator import populate_odds
from DatastorePopulator import populate_datastore
import NotificationsManager

class PopulateDatastore(webapp2.RequestHandler):
    def post(self):
        populate_datastore()    
        
class PopulateOdds(webapp2.RequestHandler):
    def post(self):
        populate_odds()
        
class SendNotification(webapp2.RequestHandler):
    def post(self):
        NotificationsManager.push_notification(self.request)
        
app = webapp2.WSGIApplication([
    ('/tasks/populate_datastore', PopulateDatastore),
    ('/tasks/populate_odds', PopulateOdds),
    ('/tasks/send_notification', SendNotification),
], debug=True)
