'''
    Determine the winning/loosing bets of a basktet match when the results are ready
'''

from MatchValidator import MatchValidator

class BasketballMatchValidator(MatchValidator):
    def __init__(self, sportId, eventId, matchId):
        super(BasketballMatchValidator, self).__init__(sportId, eventId, matchId)
    
    # @param results["Result"] = [70, 89]
    def Match_Result_validator(self, choices, results):
        return self.getMatchWinner(choices, results["Result"])
    
    # @param results["Result"] = [70, 70]
    # @param opt results["OT-result"] = [90, 89]
    def Match_Winner_validator(self, choices, results):
        return self.getMatchWinner(choices, self.getFinalResult(results))
    
    def Total_Points_validator(self, choices, results):
        totalPoints = self.getTotalPoints(results)
        return self.overUnderValidator(choices, totalPoints)
    
    def Handicap_validator(self, choices, results):
        return self.handicapValidator(choices, self.getFinalResult(results))
    
    def getTotalPoints(self, results):
        finalResult = self.getFinalResult(results)
        return sum(finalResult)
    
    def getFinalResult(self, results):
        finalResult = results["Result"]
        if "OT-result" in results:
            finalResult = results["OT-result"]
        return finalResult