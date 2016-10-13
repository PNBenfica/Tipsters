
from google.appengine.ext import ndb

# @desc - retrieves from the datastore the entity of type 'modelClass', with id = 'code' and 'parentKey'
def fetchEntity(modelClass, code, parentKey = None):
    key = ndb.Key(modelClass, code, parent=parentKey)
    return key, key.get()


# @usage - getKeyByAncestors([SportModel, sportId], [EventModel, eventId], [MatchModel, matchId], [BetModel, betId])
# @return - the key of the last entity
def getKeyByAncestors(*entities):
    key = None
    for entity in entities:
        entityModel = entity[0]
        entityId = entity[1]
        key = ndb.Key(entityModel, entityId, parent=key)
    return key