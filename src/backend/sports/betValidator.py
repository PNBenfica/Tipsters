'''
Validates the choices of each bet
    and updates its status in the datastore
'''

from sportsRetriever import getBet


# @desc updates the bet choices (stored in a json in the datastore)
# @param results - [[choiceId, status], [choiceId, status]]
def updateBet(sportId, eventId, matchId, betId, results):
    bet = getBet(sportId, eventId, matchId, betId)
    for [choiceId, status] in results:
        bet.updateChoiceStatus(choiceId, status)
    bet.put()
