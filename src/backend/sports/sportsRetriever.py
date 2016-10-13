from google.appengine.ext import ndb

from ..models import SportModel, EventModel, MatchModel, BetModel
from ..domain import Bet, Event, Match, Sport
from ..gaeUtils import fetchEntity, getKeyByAncestors

def get(sportId, leagueId, matchId):
    if (matchId is not None) and (sportId is not None):
        response = getMatch(sportId, leagueId, matchId)
    elif (leagueId is not None) and (sportId is not None):
        response = getLeague(sportId, leagueId)
    else:
        response = getSport(sportId)

    return response

# @param sportId - sport to be retrieved
# @return Sport(name, id, events)
def getSport(sportId):        
    sportKey, sport = fetchEntity(SportModel, sportId)
    events = EventModel.query(ancestor=sportKey)
    events = map(lambda event: Event(event.name, event.id), events)
    return createSport(sport, events)
    
# @param sportId - sport of the event to be retrieved
# @param eventId - event to be retrieved
# @return Sport(name, id, [Event(name,id, matches)]) - matches contains their main bets
def getLeague(sportId, eventId):
    sportKey, sport = fetchEntity(SportModel, sportId)
    eventKey, event = fetchEntity(EventModel, eventId, sportKey)
    
    matches = MatchModel.query(ancestor=eventKey).order(MatchModel.start_date)
    matches = map(lambda match: Match(match.name, match.id, match.start_date, match.status, getMainBets(sportId, match.id, eventKey)), matches)
    
    return createEvent(sport, event, matches)

# @param sportId - sport of the match to be retrieved
# @param eventId - event of the match to be retrieved
# @param matchId - match to be retrieved
# @return Sport(name, id, [Event(name,id, Match(name, id, bets,...))])
def getMatch(sportId, eventId, matchId):
    sportKey, sport = fetchEntity(SportModel, sportId)
    eventKey, event = fetchEntity(EventModel, eventId, sportKey)
    matchKey, match = fetchEntity(MatchModel, matchId, eventKey)

    bets = getMatchBets(matchKey)
    return createMatch(sport, event, match, bets)

# @return only the bet with id 'betId'
def getBet(sportId, eventId, matchId, betId):
    betKey = getKeyByAncestors([SportModel, sportId], [EventModel, eventId], [MatchModel, matchId], [BetModel, betId])
    bet = betKey.get()
    return Bet(bet)

# @return all the bets of a match
def getMatchBets(matchKey):
    bets = BetModel.query(ancestor=matchKey)
    return map(lambda bet: Bet(bet), bets)

# @desc - each event may have a special bet, if so it is returned
# @param bets - bets of a match retrieved from the datastore
def getSpecialBets(bets):
    specialBets = ["Relegation", "Place 1-4", "Outright Winner", "Place 1-2", "Drivers Championship Winner", "Constructors Championship", "Winner", "Winning Team"]
    bets = bets.filter(BetModel.name.IN(specialBets))        
    return map(lambda bet: Bet(bet.name, bet.id, bet), bets)

# @return the main bets of a match
def getMainBets(sportCode, matchCode, eventKey):
    mainBets = {"1" : "Match Result", "2" : "Match Winner", "4" : "Match Winner"}
    matchKey = ndb.Key(MatchModel, matchCode, parent = eventKey)
    bets = BetModel.query(ancestor=matchKey)
    if sportCode in mainBets:            
        bet = bets.filter(ndb.GenericProperty("name") == mainBets[sportCode]).get()
        if bet:
            return [Bet(bet)]
    return getSpecialBets(bets)

def createSport(sport, events = None):
    return Sport(sport.name, sport.id, events)

def createEvent(sport, event, matches = None):
    event = Event(event.name, event.id, matches)
    return createSport(sport, [event])

def createMatch(sport, event, match, bets):
    match = Match(match.name, match.id, match.start_date, match.status, bets)
    return createEvent(sport, event, [match])
