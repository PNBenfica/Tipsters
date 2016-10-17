'''
    Determine and updates the winning/loosing bets of a match when the results are provided
'''

from sportsRetriever import getMatch
from betValidator import updateBet
from ..domain import ChoiceStatus

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
        
        loosingChoices = filter(lambda choice: choice["id"] not in winningChoicesIDs, bet.choices )
        loosingChoices = map(lambda choice: [choice["id"], ChoiceStatus.LOST], loosingChoices)
    
        return winningChoices + loosingChoices
    
    def getBetValidator(self, betName):
        validatorName = self.getBetValidatorName(betName)
        return getattr(self, validatorName)
    
    def getBetValidatorName(self, betName):
        return betName.replace(" ", "_").replace("-", "_").replace("/", "") + "_validator"
    
    # @return a list of the winning choices (filters the initial list based on the choices[attr])
    # @param attr - "name" or "id"
    def filterWinningChoices(self, choices, winningChoices, attr):
        return filter(lambda choice: choice[attr] in winningChoices, choices)