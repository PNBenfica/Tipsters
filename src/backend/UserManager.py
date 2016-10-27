import endpoints
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from models import User, UserForm, UserMiniForm
from datetime import datetime

def register_user(name, email, pwd):    
    if _userAlreadyExist(name):
        raise endpoints.BadRequestException("Username already exists")
    if _emailAlreadyExist(email):
        raise endpoints.BadRequestException("Email already being used")
    
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

    return UserForm(name=username, email=user.email, followers=followers, following=following)


# user is an user object
def follow_user(user, userToFollowName):
    userToFollow = getUser(userToFollowName)
    
    if userToFollowName not in user.followingKeys:
        user.followingKeys.append(userToFollowName)
        userToFollow.followersKeys.append(user.key.id())
        
        user.put()
        userToFollow.put()

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
    return UserMiniForm(name=user.key.id(), email=user.email)