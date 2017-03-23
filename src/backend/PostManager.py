from google.appengine.ext import ndb
from models import User, UserForm, UserMiniForm, PostMessage, TipForm, TipModel, Post, PostComment, PostCommentMessage, FeedMessage
from domain import Bet
import gaeUtils
from datetime import datetime
from sports.sportsRetriever import getBetKey


def getFeed(user):
    return FeedMessage(posts = map(toPostMessage, _getPosts(user)) )
    
def _getPosts(user):
    return Post.query(Post.author.IN(user.followingKeys)).order(Post.date).fetch()

def storePost(user, request):  
        
    post_key = gaeUtils.generateKey(Post, user.key)
    
    data = { 'author':user.key.id(), 'key':post_key, 'comment': request.comment, \
        'nComments':0, 'nLikes':0, 'date': getCurrentDate()}
    
    data['tips'] = _storeTips(request.tips)
    
    Post(**data).put()
    
def getCurrentDate():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
   
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
    bet_key = getBetKey(tip.sportId, tip.leagueId, tip.matchId, tip.betId)
    return gaeUtils.generateKey(TipModel, bet_key)

def _getTipOdd(tip):
    bet_key = getBetKey(tip.sportId, tip.leagueId, tip.matchId, tip.betId)
    bet = Bet(bet_key.get())
    choice = bet.getChoice(tip.choiceId)
    return float(choice["odd"])

def _getPost(postKey):
    return ndb.Key(urlsafe=postKey).get()

def getPostMessage(postKey):
    post = _getPost(postKey)
    return toPostMessage(post)


def toPostMessage(post):
    tipster = getUserMiniProfile(post.author)
    tips = map(_toTipMessage, post.tips)
    comments = map(_toPostCommentMessage, getPostComments(post))
    return PostMessage(tipster=tipster,comment=post.comment,nComments=post.nComments,nLikes=post.nLikes,date=post.date,websafeKey=post.key.urlsafe(),tips=tips,comments=comments)

def getUserMiniProfile(username):
    print(username)
    user = ndb.Key(User, username).get()
    return UserMiniForm(name=username, avatar=user.avatar)

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

def getPostComments(post):
    return PostComment.query(ancestor=post.key)

def _toPostCommentMessage(comment):
    return PostCommentMessage(author=comment.author, comment=comment.comment, date=comment.date)