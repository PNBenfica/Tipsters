'''
    Determine the winning/loosing bets of a tennis match when the results are ready
'''

from MatchValidator import MatchValidator

class TennisMatchValidator(MatchValidator):
    def __init__(self, sportId, eventId, matchId):
        super(TennisMatchValidator, self).__init__(sportId, eventId, matchId)
    
    # @param results["Sets"] = [[3,7],[6,3],[6,3]]
    def Match_Winner_validator(self, choices, results):
        winnerChoiceName = self.getMatchWinnerName(results)
        return self.filterWinningChoices(choices, [winnerChoiceName], "name")
    
    # @param results["Sets"] = [[3,7],[6,3],[6,3]]
    def Total_Sets_validator(self, choices, results):
        totalSets = len(results["Sets"])
        winnerChoiceName = "%s sets" % totalSets
        return self.filterWinningChoices(choices, [winnerChoiceName], "name")
    
    def Total_Games_validator(self, choices, results):
        totalGames = self.getTotalGames(results)
        return super(TennisMatchValidator, self).overUnderValidator(choices, totalGames)
    
    def getTotalGames(self, results):
        return reduce(lambda a , b: a + sum(b) ,results["Sets"], 0)
    
    def getMatchWinnerName(self, results):
        result = self.getMatchResult(results["Sets"])
        if result[0] > result[1]:
            return "%1%"
        else:
            return "%2%"
    
    # [[3,7],[6,3],[6,3]] => [1,2]
    def getMatchResult(self, sets):
        initialResult = [0,0]
        return reduce(lambda finalResult, set_: self.addSetResult(finalResult, set_) , sets, initialResult)

    def addSetResult(self, finalResult, set_):
        if set_[0] > set_[1]:
            finalResult[0] += 1
        else:
            finalResult[1] += 1
        return finalResult