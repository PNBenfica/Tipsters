import endpoints
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from models import User, UserForm, UserMiniForm, Post, TrendsMessage, TrendUserMessage
from datetime import datetime
from Utils import random_list_element 

def register_user(name, email, pwd):    
    if _userAlreadyExist(name):
        raise endpoints.ConflictException("Username already exists")
    if _emailAlreadyExist(email):
        raise endpoints.ConflictException("Email already being used")
    
    hashPwd = _hashPassword(pwd)
    User(id=name, email=email, pwd=hashPwd).put()

def _hashPassword(pwd):
    return SHA256.new(pwd).hexdigest()

def checkPassword(user, pwd):
    return user.pwd ==  _hashPassword(pwd)   

def getUser(username):
    user = ndb.Key(User, username).get()
    if not user:
        raise endpoints.NotFoundException(username)
    else:
        return user
    
def getUserProfile(username):   
    user = getUser(username)
    followers = map(_toUserMiniForm ,_getFollowers(user))
    following = map(_toUserMiniForm ,_getFollowing(user))

    return UserForm(name=username, email=user.email, avatar=user.avatar, followers=followers, following=following)


# user is an user object
def follow_user(user, userToFollowName):
    userToFollow = getUser(userToFollowName)
    
    if userToFollowName in user.followingKeys:
        user.followingKeys.remove(userToFollowName)
        userToFollow.followersKeys.remove(user.key.id())
    else:
        user.followingKeys.append(userToFollowName)
        userToFollow.followersKeys.append(user.key.id())
    
    user.put()
    userToFollow.put()
        
# user is an user object
def unfollow_user(user, userToUnfollowName):
    userToUnfollow = getUser(userToUnfollowName)
    
    if userToUnfollowName in user.followingKeys:
        user.followingKeys.remove(userToUnfollowName)
        userToUnfollow.followersKeys.remove(user.key.id())
        
        user.put()
        userToUnfollow.put()

def _userAlreadyExist(username):
    return ndb.Key(User, username).get()

def _emailAlreadyExist(email):
    return User.query(ndb.GenericProperty("email") == email).get()

def getUserByToken(token):
    return User.query(ndb.GenericProperty("authToken") == token).get()

def updateAuthToken(user, token):
    user.authToken = token
    user.authTokenDate = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    user.put()

def _getFollowers(user):
    followersKeys = [ndb.Key(User, followerName) for followerName in user.followersKeys]
    return ndb.get_multi(followersKeys)

def _getFollowing(user):
    followingKeys = [ndb.Key(User, followingName) for followingName in user.followingKeys]
    return ndb.get_multi(followingKeys)

def _toUserMiniForm(user):
    return UserMiniForm(name=user.key.id(), avatar=user.avatar)


def getTrends(user):
    trendUsers = map(_toTrendUserMesssage, _getTrendUsers(user))    
    return TrendsMessage(users = trendUsers)

def _getTrendUsers(user):
    query = User.query()
    for followingName in user.followingKeys:
        query = query.filter(User.key != ndb.Key(User, followingName))
    return query.filter(User.key != user.key).fetch(limit=2)

def _toTrendUserMesssage(user):
    return TrendUserMessage(tipster=_toUserMiniForm(user), description=_random_description())

def _random_description():
    descriptions = ["ROI: 2.5%", "Is on a 5 green tips streak", "ROI: 5.34%", "Has 50% win percentage", "He is so good", "Follow him follow him"]
    return random_list_element(descriptions)
