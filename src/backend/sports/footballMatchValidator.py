'''
    Determine the winning/loosing bets of a football match when the results are ready
'''

from sportsRetriever import getMatch
from betValidator import updateBet
from ..domain import ChoiceStatus

# @desc determines the football match winning bets (based on the results) and updates the datastore
# @param results - {firstTeamScore:"Tottenham", Goalscorers:["1563","01215","212152"], Half_time_goals: [0,1], Full_time_goals: [2,1]}
def updateFootballMatchBets(sportId, eventId, matchId, results):
    bets = getMatchBets(sportId, eventId, matchId)
    for bet in bets:
        if bet.name == "Match Result":
            choicesStatus = determineChoicesStatus(bet, results)
            updateBet(sportId, eventId, matchId, bet.id, choicesStatus)

def getMatchBets(sportId, eventId, matchId):
    match = getMatch(sportId, eventId, matchId).events[0].matches[0]
    return match.bets

def determineChoicesStatus(bet, results):
    matchValidator = getMatchValidator(bet.name)
    
    winningChoices = matchValidator(bet.choices, results)
    winningChoicesIDs = map(lambda choice: choice["id"], winningChoices)
    winningChoices = map(lambda choiceID: [choiceID, ChoiceStatus.WON], winningChoicesIDs)
    
    loosingChoices = filter(lambda choice: choice["id"] not in winningChoicesIDs, bet.choices )
    loosingChoices = map(lambda choice: [choice["id"], ChoiceStatus.LOST], loosingChoices)

    return winningChoices + loosingChoices

def getMatchValidator(betName):
    validatorName = betName.replace(" ", "_") + "_validator"
    return globals()[validatorName]

def Match_Result_validator(choices, results):
    winningChoiceName = "Draw"
    if homeTeamWon(results):
        winningChoiceName = "%1%"
    elif awayTeamWon(results):
        winningChoiceName = "%2%"
    
    return filter(lambda choice: choice["name"] == winningChoiceName, choices)

def homeTeamWon(results):
    homeTeamGoals, awayTeamGoals = results["Full_time_goals"]
    return homeTeamGoals > awayTeamGoals

def awayTeamWon(results):
    homeTeamGoals, awayTeamGoals = results["Full_time_goals"]
    return homeTeamGoals < awayTeamGoals