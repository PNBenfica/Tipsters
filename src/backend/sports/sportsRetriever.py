
from google.appengine.ext import ndb

from ..models import SportModel, EventModel, MatchModel, BetModel
from ..domain import Bet, Choice, Event, Match, Sport

def get(sportCode, leagueCode, matchCode):
    
    if (matchCode is not None) and (sportCode is not None):
        response = getMatch(sportCode, leagueCode, matchCode)
    elif (leagueCode is not None) and (sportCode is not None):
        response = getLeague(sportCode, leagueCode)
    else:
        response = getSport(sportCode)

    return response
    
    
def fetchElement(modelClass, code, parentKey = None):
    key = ndb.Key(modelClass, code, parent=parentKey)
    return key, key.get()


def getMatch(sportCode, eventCode, matchCode):
    sportKey, sport = fetchElement(SportModel, sportCode)
    eventKey, event = fetchElement(EventModel, eventCode, sportKey)
    matchKey, match = fetchElement(MatchModel, matchCode, eventKey)

    bets = getMatchBets(matchKey)
    return createMatch(sport, event, match, bets)

def getMatchBets(matchKey):
    bets = BetModel.query(ancestor=matchKey)
    return map(lambda bet: Bet(bet.name, bet.id, getBetChoices(bet)), bets)
        
def getBetChoices(bet):        
    return map(lambda choice: Choice(choice["name"], choice["id"], choice["odd"]), bet.choices)
    
def getSpecialBets(bets):
    specialBets = ["Relegation", "Place 1-4", "Outright Winner", "Place 1-2", "Drivers Championship Winner", "Constructors Championship", "Winner", "Winning Team"]
    bets = bets.filter(BetModel.name.IN(specialBets))        
    return map(lambda bet: Bet(bet.name, bet.id), bets)

def getMainBets(sportCode, matchCode, eventKey):
    mainBets = {"1" : "Match Result", "2" : "Match Winner", "4" : "Match Winner"}
    matchKey = ndb.Key(MatchModel, matchCode, parent = eventKey)
    bets = BetModel.query(ancestor=matchKey)
    if sportCode in mainBets:            
        bet = bets.filter(ndb.GenericProperty("name") == mainBets[sportCode]).get()
        if bet:
            return [Bet(bet.name, bet.id, getBetChoices(bet))]
    return getSpecialBets(bets)
    
def getLeague(sportCode, eventCode):
    sportKey, sport = fetchElement(SportModel, sportCode)
    eventKey, event = fetchElement(EventModel, eventCode, sportKey)
    
    matches = MatchModel.query(ancestor=eventKey).order(MatchModel.start_date)
    matches = map(lambda match: Match(match.name, match.id, match.start_date, getMainBets(sportCode, match.id, eventKey)), matches)
    
    return createEvent(sport, event, matches)

def getSport(sportCode):        
    sportKey, sport = fetchElement(SportModel, sportCode)
    events = EventModel.query(ancestor=sportKey)
    events = map(lambda event: Event(event.name, event.id), events)
    return createSport(sport, events)

def createMatch(sport, event, match, bets):
    match = Match(match.name, match.id, match.start_date, bets)
    return createEvent(sport, event, [match])

def createEvent(sport, event, matches = None):
    event = Event(event.name, event.id, matches)
    return createSport(sport, [event])

def createSport(sport, events = None):
    return Sport(sport.name, sport.id, events)
