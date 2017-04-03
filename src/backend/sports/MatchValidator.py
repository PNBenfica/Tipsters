'''
    Determine and updates the winning/loosing bets of a match when the results are provided

    #getMatchValidator("1", "3", "1181299").updateMatchResults({"Full_time_goals": [2,0], "Half_time_goals": [0,0], "First_team_to_score": "No Goal", "Goalscorers":{"first":"211432922", "last":"211432754", "all":["211434234","211434230"], "firstEligibles": ["211432918", "211432914", "211432922"], "lastEligibles": ["211432754", "211432750", "211432746"], "anytimeEligibles":["211434234", "211434230", "211434226"]}})
    #getMatchValidator("2", "239", "1221474").updateMatchResults({"Sets": [[1,6],[0,6],[6,0]]})
    #getMatchValidator("4", "20381", "1221980").updateMatchResults({"Result": [70,70], "OT-result": [84,92]})
'''

from sportsRetriever import getMatch
from betValidator import updateBet
from ..domain import ChoiceStatus
from ..Utils import random_list_element
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
        self._getMatch().set_status_archived() 
    
    def _getMatch(self):
        return getMatch(self.sportId, self.eventId, self.matchId).events[0].matches[0]
    
    def getMatchBets(self):
        match = self._getMatch()
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
    
    
    def Random_validator(self, choices):
        return self.filterWinningChoices(choices, [self.random_choice(choices)], "name")
    
    def random_choice(self, choices):
        choices_names = map(lambda choice: choice["name"], choices)
        return random_list_element(choices_names)
    
    # @return a list of the winning choices (filters the initial list based on the choices[attr])
    # @param attr - "name" or "id"
    def filterWinningChoices(self, choices, winningChoices, attr):
        return filter(lambda choice: choice[attr] in winningChoices, choices)