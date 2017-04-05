from __future__ import division
import endpoints
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from domain import Bet, PostStatus
from models import User, UserForm, UserMiniForm, TrendsMessage, TrendUserMessage, RankingsMessage, UserRankingProfileMessage, UserStatsMessage
from datetime import datetime
from Utils import average, random_list_element
import PostManager

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

def _getNumberFollowers(user):
    return len(user.followersKeys)

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


def getRankings():
    users = _getAllUsers()
    users_ranking_profiles = map(_get_user_ranking_profile, users)
    users_ranking_profiles_messages = map(_to_ranking_profile_message, users_ranking_profiles)
    return RankingsMessage(users = users_ranking_profiles_messages)

def _getAllUsers():
    return User.query()

def _get_user_ranking_profile(user):
    tipster = _toUserMiniForm(user)
    stats = _get_user_stats(user)
    return UserRankingProfileMessage(tipster = tipster, stats = stats)

def _get_user_stats(user):
    posts = PostManager._getUserPosts(user)
    _determine_posts_status(posts)
    posts = _filter_open_posts(posts)
    posts_status = map(lambda post: post.status, posts)
    
    nTips = len(posts)
    nFollowers = _getNumberFollowers(user)
    streak = _user_tips_streak(posts_status)
    winPercentage =  _user_win_percentage(posts_status, nTips)
    ROI = _user_ROI(posts)
    avgWinOdds = _user_avg_win_odds(posts)
    return UserStatsMessage(nTips=nTips, nFollowers=nFollowers, streak=streak, ROI=ROI, winPercentage=winPercentage, avgWinOdds=avgWinOdds)

def _determine_posts_status(posts):
    for post in posts:
        post.status = _get_post_status(post)

def _get_post_status(post):
    choices_status = map(_get_choice_status, post.tips)
    
    post_status = ""
    
    if PostStatus.LOST in choices_status:
        post_status = PostStatus.LOST
    elif PostStatus.PENDENT in choices_status:
        post_status = PostStatus.PENDENT
    else:
        post_status = PostStatus.WON
        
    return post_status

def _get_choice_status(tip_key):
    tip = tip_key.get()
    bet_key = tip_key.parent()
    bet = bet_key.get()
    choice = Bet(bet).getChoice(tip.choiceId)
    return choice["status"]

def _filter_open_posts(posts):
    return filter(lambda post: post.status not in [PostStatus.PENDENT, PostStatus.VOID], posts)

def _user_tips_streak(tips_status):
    streak = 0
    for status in tips_status:
        if status == "Won":
            streak += 1
        else:
            break
    return streak

def _user_win_percentage(tips_status, nTips):
    wonTips = filter(lambda status: status == PostStatus.WON, tips_status)
    if (len(wonTips) == 0 or nTips == 0):
        return float(0)
    return len(wonTips) / float(nTips)

def _user_avg_win_odds(posts):
    won_posts_odds = _get_won_posts_odds(posts)
    return average(won_posts_odds)

def _user_ROI(posts):
    unit = 100
    total_investment = unit * len(posts)
    if total_investment==0: return
    profit = calculate_profit(posts, unit)
    return profit / total_investment * 100

def calculate_profit(posts, unit):
    profit = 0
    for post in posts:
        if post.status == PostStatus.LOST:
            profit -= unit
        elif post.status == PostStatus.WON:
            profit += post.totalOdd * unit - unit
    return profit

def _get_won_posts_odds(posts):
    won_posts = _get_won_posts(posts)
    won_posts_odds = map(lambda post: post.totalOdd, won_posts)
    return won_posts_odds

def _get_won_posts(posts):
    return filter(lambda post: post.status == PostStatus.WON, posts)

def _to_ranking_profile_message(user_ranking_profile):
    return user_ranking_profile
