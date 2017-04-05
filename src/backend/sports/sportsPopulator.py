
from google.appengine.ext import ndb

from ..models import SportModel, EventModel, MatchModel, BetModel
from random import randint

from XMLOddsParser import parseXMLOdds
import MatchValidator

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











def simulate_sports_results():
    sports = parseXMLOdds()
    simulators = { "Football": simulate_football_results, "Tennis": simulate_tennis_results, "Basketball": simulate_basket_results }
    for sport in sports:
        for event in sport["events"]:
            for match in event["matches"]:
                if toSimulate():
                    results = simulators[sport["name"]](match)
                    MatchValidator.getMatchValidator(sport["id"], event["id"], match["id"]).updateMatchResults(results)
                
def toSimulate():
    return randint(0, 10) > -1

def simulate_football_results(match):
    results = {}
    results["Half_time_goals"] = simulate_half_time_score()
    results["Full_time_goals"] = simulate_full_time_score(results["Half_time_goals"])
    results["First_team_to_score"] = simulate_first_team_to_score(results["Full_time_goals"])
    
    if hasGoalScorerBets(match):
        results["Goalscorers"] = simulate_goalscorers(match, results["Full_time_goals"], results["First_team_to_score"])
    
    return results

def simulate_half_time_score():
    return [randint(0,2), randint(0,1)]

def simulate_full_time_score(half_time_score):
    return [half_time_score[0] + randint(0,2), half_time_score[1] + randint(0,2)]

def simulate_first_team_to_score(full_time_score):
    if full_time_score[0] > 0:
        return home_team()
    elif full_time_score[1] > 0:
        return away_team()
    else:
        return "No Goal"

def hasGoalScorerBets(match):
    betNames = map(lambda bet: bet["name"], match["bets"])
    return "Goalscorer" in betNames or "First Goalscorer" in betNames or "Last Goalscorer" in betNames

def simulate_goalscorers(match, full_time_score, first_team_to_score):
    return no_goalscorer() # fuck this
    #first_goalscorer = simulate_single_goalscorer(match, first_team_to_score)
    #last_goalscorer = simulate_goalscorer(match, first_team_to_score)
    #all_goalscorers = simulate_goalscorers(match, full_time_score)


def no_goalscorer():
    return {"first" : "No Goalscorer", "last" : "No Goalscorer", "all" : [], "firstEligibles": [], "lastEligibles": [], "anytimeEligibles": []}

def simulate_multi_goalscorer(match, first_team_to_score):
    return

def home_team():
    return "%1%"

def away_team():
    return "%2%"

def simulate_tennis_results(match):
    results = {"Sets": [[randint(0, 4),6],[randint(0, 4),6],[6,randint(0, 4)]]}
    return results
    
def simulate_basket_results(match):
    home_team_score = randint(75, 110)
    away_team_score = randint(home_team_score - 10, home_team_score + 10)
    results = {"Result": [ home_team_score, away_team_score]}
    if home_team_score == away_team_score:
        results["OT-result"] = [home_team_score + randint(10, 15), away_team_score + randint(2, 9)]
    return results
    