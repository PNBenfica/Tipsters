from models import SportMessage, EventMessage, MatchMessage, BetMessage, ChoiceMessage

class Sport():
    def __init__(self, name, sportId, events = []):
        self.name = name
        self.id = sportId
        self.events = events
    
    def toMessage(self):
        return SportMessage(name=self.name, id=self.id, events=map(lambda event: event.toMessage(), self.events))

class Event():
    def __init__(self, name, eventId, matches = []):
        self.name = name
        self.id = eventId
        self.matches = matches
        
    def toMessage(self):
        return EventMessage(name=self.name, id=self.id, matches=map(lambda match: match.toMessage(), self.matches))
    
class Match():
    def __init__(self, name, matchId, start_date, status, bets = []):
        self.name = name
        self.id = matchId
        self.start_date = start_date
        self.status = status
        self.bets = bets
        
    def toMessage(self):
        return MatchMessage(name = self.name, id = self.id, start_date = self.start_date, status = self.status, bets=map(lambda bet: bet.toMessage(), self.bets))
    
class Bet():
    def __init__(self, betModel):
        self.name = betModel.name
        self.id = betModel.id
        self.choices = betModel.choices
        self.betModel = betModel
    
    def getChoice(self, choiceId):
        return filter(lambda choice: choice["id"] == choiceId, self.choices)[0]
    
    def updateChoiceStatus(self, choiceId, status):
        choice = self.getChoice(choiceId)
        choice["status"] = status
    
    def put(self):
        self.betModel.put()
    
    def choiceToMessage(self, choice):
        return ChoiceMessage(name = choice["name"], id = choice["id"], odd = choice["odd"], status = choice["status"], postsKeys = choice["postsKeys"])
    
    def addTip(self, choiceId, postId):
        choice = self.getChoice(choiceId)
        choice["postsKeys"].append(postId)
        self.put()
    
    def toMessage(self):
        return BetMessage(name = self.name, id = self.id, choices = map(lambda choice: self.choiceToMessage(choice), self.choices))


#class Choice():
#    def __init__(self, name, choiceId, odd, status):
#        self.name = name
#        self.id = choiceId
#        self.odd = odd
#        self.status = status
        
#    def toMessage(self):
#        return ChoiceMessage(name = self.name, id = self.id, odd = self.odd, status = self.status)
    
def enum(**enums):
    return type('Enum', (), enums)

ChoiceStatus = enum(PENDENT="Pendent", WON="Won", LOST="Lost", VOID="Void")
MatchStatus = enum(PRELIVE="Pre-live", LIVE="Live", ARCHIVED="Archived")