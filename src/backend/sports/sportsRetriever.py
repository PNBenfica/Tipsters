from google.appengine.ext import ndb

from ..models import SportModel, EventModel, MatchModel, BetModel, TipModel, Post, TipOnThisEventMessage
from ..domain import Bet, Event, Match, Sport
from ..gaeUtils import fetch, fetchEntity, getKeyByAncestors
from ..PostManager import getUserMiniProfile, toTipMessage
from ..Utils import remove_empty

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
    matches = map(lambda match: Match(match, getMainBets(sportId, match.id, eventKey)), matches)
    
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

def getMatchModel(sportId, eventId, matchId):
    matchKey = getMatchKey(sportId, eventId, matchId)
    match = matchKey.get()
    return Match(match)

def getMatchKey(sportId, eventId, matchId):
    return getKeyByAncestors([SportModel, sportId], [EventModel, eventId], [MatchModel, matchId])

# @return only the bet with id 'betId'
def getBet(sportId, eventId, matchId, betId):
    betKey = getBetKey(sportId, eventId, matchId, betId)
    bet = betKey.get()
    return Bet(bet)

def getBetKey(sportId, eventId, matchId, betId):
    return getKeyByAncestors([SportModel, sportId], [EventModel, eventId], [MatchModel, matchId], [BetModel, betId])

# @return all the bets of a match
def getMatchBets(matchKey):
    bets = BetModel.query(ancestor=matchKey)
    return map(lambda bet: Bet(bet), bets)

# @desc - each event may have a special bet, if so it is returned
# @param bets - bets of a match retrieved from the datastore
def getSpecialBets(bets):
    specialBets = ["Relegation", "Place 1-4", "Outright Winner", "Place 1-2", "Drivers Championship Winner", "Constructors Championship", "Winner", "Winning Team"]
    bets = bets.filter(BetModel.name.IN(specialBets))        
    return map(lambda bet: Bet(bet), bets)

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

def _getEventMatches(event):
    return MatchModel.query(ancestor=event.key).order(MatchModel.start_date)

def get_tips(sportId, leagueId, matchId):
    if (matchId is not None) and (sportId is not None):
        response = _getMatchTips(sportId, leagueId, matchId)
    elif (leagueId is not None) and (sportId is not None):
        response = _getLeagueTips(sportId, leagueId)
    else:
        response = _getSportTips(sportId)

    return response

def _getSportTips(sportId):
    sportKey = fetchEntity(SportModel, sportId)[0]
    events = EventModel.query(ancestor=sportKey)

    tips = []
    for event in events:
        tips += _getLeagueTips(sportId, event.id)
        
    return tips

def _getLeagueTips(sportId, eventId):
    sportKey = fetchEntity(SportModel, sportId)[0]
    event = fetchEntity(EventModel, eventId, sportKey)[1]
    
    tips = []
    for match in _getEventMatches(event):
        tips += _getMatchTips(sportId, eventId, match.id)
    return tips

def _getMatchTips(sportId, eventId, matchId):
    sportKey = fetchEntity(SportModel, sportId)[0]
    eventKey = fetchEntity(EventModel, eventId, sportKey)[0]
    matchKey = fetchEntity(MatchModel, matchId, eventKey)[0]

    matchBets = getMatchBets(matchKey)
    
    tips = map(lambda bet: TipModel.query(ancestor=bet.betModel.key).fetch(), matchBets)
    tips = [x[0] for x in tips if x != []]
    posts = Post.query()
    return map(lambda tip: toTipOnThisEventMessage(posts, tip) , tips)


def _getTipPost(tipKey, posts):
    for post in posts:
        if tipKey in post.tips:
            return post

def toTipOnThisEventMessage(posts, tip):
    post = _getTipPost(tip.key, posts)
    tip = toTipMessage(tip)
    tipster = getUserMiniProfile(post.author)
    return TipOnThisEventMessage(tipster=tipster, tip=tip)


def createSport(sport, events = None):
    return Sport(sport.name, sport.id, events)

def createEvent(sport, event, matches = None):
    event = Event(event.name, event.id, matches)
    return createSport(sport, [event])

def createMatch(sport, event, match, bets):
    match = Match(match, bets)
    return createEvent(sport, event, [match])
