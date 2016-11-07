import endpoints
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from models import User, UserForm, UserMiniForm, Post
from datetime import datetime
from PostManager import toPostMessage

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
    posts = map(toPostMessage, _getPosts(user))

    return UserForm(name=username, email=user.email, avatar=user.avatar, followers=followers, following=following, posts=posts)


# user is an user object
def follow_user(user, userToFollowName):
    userToFollow = getUser(userToFollowName)
    
    if userToFollowName not in user.followingKeys:
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

def _getPosts(user):
    return Post.query(ancestor=user.key)

def _toUserMiniForm(user):
    return UserMiniForm(name=user.key.id(), email=user.email)