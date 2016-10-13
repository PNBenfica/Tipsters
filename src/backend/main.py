#!/usr/bin/env python

"""
main.py -- Tipsters server-side Python App Engine
    HTTP controller handlers for memcache & task queue access

"""

import webapp2

from sports.sportsPopulator import populate_odds

class PopulateOddsHandler(webapp2.RequestHandler):
    def post(self):
        populate_odds()
        
app = webapp2.WSGIApplication([
    ('/tasks/populate_odds', PopulateOddsHandler),
], debug=True)
