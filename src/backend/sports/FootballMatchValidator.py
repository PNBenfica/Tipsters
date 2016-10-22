'''
    Determine the winning/loosing bets of a football match when the results are ready
'''

from MatchValidator import MatchValidator

class FootballMatchValidator(MatchValidator):
    def __init__(self, sportId, eventId, matchId):
        super(FootballMatchValidator, self).__init__(sportId, eventId, matchId)
        
    def Match_Result_validator(self, choices, results):
        return self.getMatchWinner(choices, results["Full_time_goals"])

    def Half_Time_Result_validator(self, choices, results):
        return self.getMatchWinner(choices, results["Half_time_goals"])

    def Half_Time__Full_Time_validator(self, choices, results):
        halfTimeWinnerName = self.getMatchWinnerName(results["Half_time_goals"])
        fullTimeWinnerName = self.getMatchWinnerName(results["Full_time_goals"])
        winningChoiceName = '%s / %s' % (halfTimeWinnerName, fullTimeWinnerName)
        return self.filterWinningChoices(choices, [winningChoiceName], "name")

    def Double_Chance_validator(self, choices, results):
        matchWinnerName = self.getMatchWinnerName(results["Full_time_goals"])
        return filter(lambda choice: matchWinnerName in choice["name"], choices)

    def Handicap_validator(self, choices, results):
        return self.handicapValidator(choices, results["Full_time_goals"])

    def getTotalGoals(self, results):
        return sum(results["Full_time_goals"])
    
    def OverUnder_validator(self, choices, results):
        totalGoals = self.getTotalGoals(results)
        return self.overUnderValidator(choices, totalGoals)
    
    def Total_Goals_validator(self, choices, results):
        totalGoals = self.getTotalGoals(results)
        
        winningChoiceName = "4+"
        if totalGoals < 2:
            winningChoiceName = "0 - 1"
        elif totalGoals < 4:
            winningChoiceName = "2 - 3"
        return self.filterWinningChoices(choices, [winningChoiceName], "name")

    def Number_of_Goals_validator(self, choices, results):
        totalGoals = self.getTotalGoals(results)
        
        winningChoiceName = "5+"
        if totalGoals < 5:
            winningChoiceName = str(totalGoals)
        return self.filterWinningChoices(choices, [winningChoiceName], "name")

    def resultToString(self, result):
        return '%s - %s' % (result[0], result[1])

    def Correct_Score_validator(self, choices, results):
        correctScore = self.resultToString(results["Full_time_goals"])
        return self.filterWinningChoices(choices, [correctScore], "name")

    def Half_Time_Correct_Score_validator(self, choices, results):
        correctScore = self.resultToString(results["Half_time_goals"])
        return self.filterWinningChoices(choices, [correctScore], "name")

    def First_Team_To_Score_validator(self, choices, results):
        teamName = results["First_team_to_score"]
        return self.filterWinningChoices(choices, [teamName], "name")

    def First_Goalscorer_validator(self, choices, results):
        return self.getGoalScorerChoice(choices, results["Goalscorers"]["first"])

    def Last_Goalscorer_validator(self, choices, results):
        return self.getGoalScorerChoice(choices, results["Goalscorers"]["last"])

    def Goalscorer_validator(self, choices, results):
        return self.filterWinningChoices(choices, results["Goalscorers"]["all"], "id")

    def getGoalScorerChoice(self, choices, goalScorer):
        if goalScorer == "No Goalscorer":
            return self.filterWinningChoices(choices, ["No Goalscorer"], "name")
        else:
            return self.filterWinningChoices(choices, [goalScorer], "id")