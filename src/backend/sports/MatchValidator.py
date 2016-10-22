'''
    Determine and updates the winning/loosing bets of a match when the results are provided
'''

from sportsRetriever import getMatch
from betValidator import updateBet
from ..domain import ChoiceStatus
import importlib

def getMatchValidator(sportId, leagueId, matchId):
    sportMap = {"3":"Formula 1", "4":"Basketball", "15":"Motorcycling", "2":"Tennis", "1":"Football"}
    sportValidatorName = sportMap[sportId] + "MatchValidator"
    moduleName = "src.backend.sports." + sportValidatorName 
    sportValidatorClass = getattr(importlib.import_module(moduleName), sportValidatorName)
    return sportValidatorClass(sportId, leagueId, matchId)

class MatchValidator(object):
    
    def __init__(self, sportId, eventId, matchId):
        self.sportId = sportId
        self.eventId = eventId
        self.matchId = matchId
    
    def updateMatchResults(self, results):
        bets = self.getMatchBets()
        for bet in bets:
            choicesStatus = self.determineChoicesStatus(bet, results)
            updateBet(self.sportId, self.eventId, self.matchId, bet.id, choicesStatus)    
    
    def getMatchBets(self):
        match = getMatch(self.sportId, self.eventId, self.matchId).events[0].matches[0]
        return match.bets    
    
    # @param bet - will be assign a status to each choice of this bet
    # @return [["1256", "Won"], ["3654", "Lost"], [ChoiceId, Status]] 
    def determineChoicesStatus(self, bet, results):
        matchValidator = self.getBetValidator(bet.name)
        
        winningChoices = matchValidator(bet.choices, results)
        winningChoicesIDs = map(lambda choice: choice["id"], winningChoices)
        winningChoices = map(lambda choiceID: [choiceID, ChoiceStatus.WON], winningChoicesIDs)
        
        voidChoices = filter(lambda choice: choice["status"] == ChoiceStatus.VOID, bet.choices )
        voidChoicesIDs = map(lambda choice: choice["id"], voidChoices)
        assignedChoicesIDs = winningChoicesIDs + voidChoicesIDs
        
        loosingChoices = filter(lambda choice: choice["id"] not in assignedChoicesIDs, bet.choices )
        loosingChoices = map(lambda choice: [choice["id"], ChoiceStatus.LOST], loosingChoices)
    
        return winningChoices + loosingChoices
    
    def getBetValidator(self, betName):
        validatorName = self.getBetValidatorName(betName)
        return getattr(self, validatorName)
    
    def getBetValidatorName(self, betName):
        return betName.replace(" ", "_").replace("-", "_").replace("/", "") + "_validator"
    
    
    
    # @param result - [homeTeamGoals, awayTeamGoals] - p.e [3,2]
    # @return [choice that won (1, draw or 2 choice)]
    def getMatchWinner(self, choices, result):
        winningChoiceName = self.getMatchWinnerName(result)
        return self.filterWinningChoices(choices, [winningChoiceName], "name")

    def getMatchWinnerName(self, result):
        winningChoiceName = "Draw"
        if self.homeTeamWon(result):
            winningChoiceName = "%1%"
        elif self.awayTeamWon(result):
            winningChoiceName = "%2%"
        return winningChoiceName

    # @param result - [homeTeamGoals, awayTeamGoals] - p.e [3,2]
    def homeTeamWon(self, result):
        homeTeamGoals, awayTeamGoals = result
        return homeTeamGoals > awayTeamGoals

    # @param result - [homeTeamGoals, awayTeamGoals] - p.e [3,2]
    def awayTeamWon(self, result):
        homeTeamGoals, awayTeamGoals = result
        return homeTeamGoals < awayTeamGoals
    
    
    def handicapPredicate(self, choice, result):
        choiceSelectionName = choice["name"].split(' ', 1)[0] # "%1% +2" => "%1%"
        result = self.determineHandicapResult(choice["name"], choiceSelectionName, result)
        return self.getMatchWinnerName(result) == choiceSelectionName

    def handicapValidator(self, choices, result):
        return filter(lambda choice:  self.handicapPredicate(choice, result), choices)

    # returns the final result taking in consideration the handicap
    # ex: determineHandicapResult("%1% + 1", "%1%", [1,1]) => [2,1]
    def determineHandicapResult(self, choiceName, choiceSelectionName, result):
        result = list(result)
        if (choiceSelectionName == "Draw"):
            handicapTeamIndex = int(choiceName[7]) - 1
            handicapGoals = int(choiceName[-3:-1])
        else:
            handicapTeamIndex = int(choiceName[1]) - 1   # "%2% +2" => 2 => index 1
            handicapGoals = float(choiceName.split(' ', 1)[1])    # "%2% +2" => 2
        
        result[handicapTeamIndex] += handicapGoals
        return result

    def overUnderValidator(self, choices, total):
        return filter(lambda choice: \
                      (choice["name"].startswith("Under") and self.getOverUnderValue(choice) > total) or \
                      (choice["name"].startswith("Over") and self.getOverUnderValue(choice) < total), choices)
    
    def getOverUnderValue(self, choice):
        return float(choice["name"].rsplit(None, 1)[-1])
    
    # @return a list of the winning choices (filters the initial list based on the choices[attr])
    # @param attr - "name" or "id"
    def filterWinningChoices(self, choices, winningChoices, attr):
        return filter(lambda choice: choice[attr] in winningChoices, choices)