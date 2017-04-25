from google.appengine.ext import ndb
from models import MatchModel, EventModel, SportModel, BetModel, User, UserMiniForm, PostMessage, TipForm, TipModel, Post, PostComment, PostCommentMessage, FeedMessage
from domain import Bet, NotificationType
import gaeUtils
from Utils import getCurrentDate
from google.appengine.api import taskqueue
from gaeUtils import getKeyByAncestors


def getFeed(user):
    posts = _getFeedPosts(user)
    return toPostsMessage(user, posts)

def _getFeedPosts(user):
    return Post.query(Post.author.IN(user.followingKeys)).order(-Post.date).fetch()

# get the posts of a given user
def getUserPosts(requiringUserName, fetchedUserName):
    posts = _getUserPosts(ndb.Key(User, fetchedUserName).get())
    return toPostsMessage(requiringUserName, posts)

def _getUserPosts(user):
    return Post.query(ancestor=user.key).order(-Post.date)

def _get_user_number_posts(user):
    return Post.query(ancestor=user.key).count()

def toPostsMessage(user, posts):
    posts = map(lambda post: toPostMessage(user, post), posts)
    return FeedMessage(posts = posts)

def storePost(user, request):  
        
    post_key = gaeUtils.generateKey(Post, user.key)
    
    data = { 'author':user.key.id(), 'key':post_key, 'comment': request.comment, \
        'nComments':0, 'nLikes':0, 'date': getCurrentDate(), 'totalOdd': _calculate_total_odd(request.tips) }
    
    data['tips'] = _storeTips(request.tips)
    
    Post(**data).put()
    
    return post_key

def _calculate_total_odd(tips):
    tips_odds = map(_getTipOdd, tips)
    return reduce(lambda a,b: a * b, tips_odds, 1)
       
# store the tips in the datastore
# @return - list of keys of the tip models
def _storeTips(tips):
    return map(_storeTip, tips)
    
# store a tip in the datastore
# @return - key of the tip model stored
def _storeTip(tip):
    tip_key = _getTipModelKey(tip)
    tip = { "choiceId" : tip.choiceId, "odd": _getTipOdd(tip), "key" : tip_key }
    TipModel(**tip).put()
    return tip_key

def _getTipModelKey(tip):
    bet_key = _getBetKey(tip.sportId, tip.leagueId, tip.matchId, tip.betId)
    return gaeUtils.generateKey(TipModel, bet_key)

def _getTipOdd(tip):
    bet_key = _getBetKey(tip.sportId, tip.leagueId, tip.matchId, tip.betId)
    bet = Bet(bet_key.get())
    choice = bet.getChoice(tip.choiceId)
    return float(choice["odd"])

def _getBetKey(sportId, eventId, matchId, betId):
    return getKeyByAncestors([SportModel, sportId], [EventModel, eventId], [MatchModel, matchId], [BetModel, betId])

def _getPost(postKey):
    return ndb.Key(urlsafe=postKey).get()

def getPostMessage(user, postKey):
    post = _getPost(postKey)
    return toPostMessage(user, post)


def toPostMessage(user, post):
    tipster = getUserMiniProfile(post.author)
    tips = map(_toTipMessage, post.tips)
    comments = map(_toPostCommentMessage, getPostComments(post))
    liked = _userLikedPost(user,post)
    return PostMessage(tipster=tipster,liked=liked,comment=post.comment,nComments=post.nComments,nLikes=post.nLikes,date=post.date,totalOdd=post.totalOdd,websafeKey=post.key.urlsafe(),tips=tips,comments=comments)

def getUserMiniProfile(username):
    user = ndb.Key(User, username).get()
    return UserMiniForm(name=username, avatar=user.avatar)

def toTipMessage(tip):
    return _toTipMessage(tip.key)

def _toTipMessage(tip_key):
    tip = tip_key.get()
    bet_key = tip_key.parent()
    match_key = bet_key.parent()
    league_key = match_key.parent()
    sport_key = league_key.parent()
    bet, match, league, sport = bet_key.get(), match_key.get(), league_key.get(), sport_key.get()
    choice = Bet(bet).getChoice(tip.choiceId)
    
    return TipForm(odd=tip.odd, choiceName=choice["name"], choiceId=tip.choiceId, status=choice["status"], sportName=sport.name, sportId=sport.id,\
                   leagueName=league.name, leagueId=league.id, matchName=match.name, matchId=match.id, betName=bet.name, betId=bet.id)


def addCommentToPost(username, postUrlSafeKey, comment):
    post = _getPost(postUrlSafeKey)
    
    commentKey = gaeUtils.generateKey(PostComment, post.key)
    commentData = { "comment" : comment, "key" : commentKey, "author" : username, "date" : getCurrentDate() }
    PostComment(**commentData).put()
    
    post.nComments += 1
    post.put()
    
    send_comment_post_notification(post, postUrlSafeKey, username)

def send_comment_post_notification(post, postUrlSafeKey, username):
    params = { 'type' : NotificationType.COMMENT, 'source' : username, 'target' : post.author, 'post_id' : postUrlSafeKey }
    taskqueue.add(url='/tasks/send_notification', params=params)

def getPostComments(post):
    return PostComment.query(ancestor=post.key)


def _userLikedPost(user, post):
    username = user.key.id()
    return username in post.likesUsersKeys
    
def likePost(user, postUrlSafeKey):
    post = _getPost(postUrlSafeKey)
    username = user.key.id()
    
    disliking = _userLikedPost(user, post)
    if disliking:
        post.nLikes -= 1
        post.likesUsersKeys.remove(username)
    else:
        post.nLikes += 1
        post.likesUsersKeys.append(username)
        
    post.put()
    
    send_like_notification(post, postUrlSafeKey, username, not disliking)



def send_like_notification(post, post_id, username, liking):
    if liking:
        params = { 'type' : NotificationType.LIKE, 'source' : username, 'target' : post.author, 'post_id' : post_id }
    else:
        params = { 'type' : NotificationType.DISLIKE, 'source' : username, 'target' : post.author, 'post_id' : post_id }
    taskqueue.add(url='/tasks/send_notification', params=params)

def _toPostCommentMessage(comment):
    tipster = getUserMiniProfile(comment.author)
    return PostCommentMessage(tipster=tipster, comment=comment.comment, date=comment.date)