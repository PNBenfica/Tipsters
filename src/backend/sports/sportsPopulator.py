
from google.appengine.ext import ndb

from ..models import SportModel, EventModel, MatchModel, BetModel

from XMLOddsParser import parseXMLOdds

def populate_odds():
    sports = parseXMLOdds()
    for sport in sports:
        if sport["name"] in ["Football", "Tennis", "Basketball"]:
            insertSport(sport)
        
# @desc inserts a sport entity in the datastore and all its events
def insertSport(sport):
    s_key = ndb.Key(SportModel, sport["id"])
    insertElements(sport, s_key, "events")
    SportModel(key = s_key, id = sport["id"], name = sport["name"]).put()

# @desc inserts in the datastore the 'parent'['attr'] (p.e. sport["events"]) entities
# @param parent - parent array data
# @param parentKey - parent datastore key, used to create ancestor relationship
# @param attr - attribute of the parent that contains the elements to insert in the datastore
def insertElements(parent, parentKey, attr):
    methodName = "create" + (attr.title()[:-1])
    createChildFunc = globals()[methodName]
    ndb.put_multi(map( lambda child: createChildFunc(child, parent, parentKey) , parent[attr]))

def createElement(eType, element, parent, parentKey, parentIdAttribName, childsAttrib, optAttribs = [] ):
    e_key = ndb.Key(eType, element["id"], parent=parentKey)
    
    if childsAttrib is not None:
        insertElements(element, e_key, childsAttrib)
    
    elementModel = eType( key = e_key, id = element["id"], name = element["name"])
    setattr( elementModel, parentIdAttribName, parent["id"])
    for attr in optAttribs:
        setattr( elementModel, attr, element[attr])
    return elementModel
    
def createEvent(event, sport, sportKey):
    return createElement(EventModel, event, sport, sportKey, "sportId", "matches")
    
def createMatche(match, event, eventKey):
    return createElement(MatchModel, match, event, eventKey, "eventId", "bets", ["start_date", "status"])
    
def createBet(bet, match, matchKey):
    b_key = ndb.Key(BetModel, bet["id"], parent=matchKey)
    
    return BetModel( 
            key = b_key, 
            id = bet["id"], 
            name = bet["name"], 
            choices = bet["choices"],
            matchId = match["id"])
    
#def createChoice(choice, bet, betKey):
#    return createElement(ChoiceModel, choice, bet, betKey, "betId", None, ["odd"])