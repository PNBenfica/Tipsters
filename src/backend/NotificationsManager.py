from google.appengine.ext import ndb
from domain import NotificationType
from models import NotificationModel, NotificationMessage, NotificationsMessage
from gaeUtils import generateKey
from UserManager import _get_user_key, get_user_mini_form
from Utils import getCurrentDate
from endpoints.api_exceptions import ForbiddenException


###### PUSH NOTITIFICATIONS ######

def push_notification(request):
    notification_type = request.get('type')
    user_source = request.get('source')
    user_target = request.get('target')
    post_id = request.get('post_id')
    return {
        NotificationType.FOLLOW : lambda: send_follow_notification(user_target, user_source),
        NotificationType.UNFOLLOW : lambda: remove_follow_notification(user_target, user_source),
        NotificationType.LIKE : lambda: send_like_notification(user_target, user_source, post_id),
        NotificationType.DISLIKE : lambda: remove_like_notification(user_target, user_source, post_id),
        NotificationType.COMMENT : lambda: send_comment_notification(user_target, user_source, post_id)
    }[notification_type]()

def send_like_notification(userTargetName, userSourceName, post_id):
    
    data = {'type': NotificationType.LIKE, 'post_id': post_id, 'content': "liked your post"}
    _push_new_notification(userTargetName, userSourceName, data)
    

def send_comment_notification(userTargetName, userSourceName, post_id):
    
    data = {'type': NotificationType.COMMENT, 'post_id': post_id, 'content': "commented your post"}
    _push_new_notification(userTargetName, userSourceName, data)


def send_follow_notification(userTargetName, followerName):
    data = {'type': NotificationType.FOLLOW, 'content': "started following you"}
    _push_new_notification(userTargetName, followerName, data)


def _push_new_notification(userTargetName, userSourceName, data):
    
    notification_key = _generate_notification_key(userTargetName)
    
    data['key'] = notification_key
    data['id'] = notification_key.urlsafe()
    data['date'] = getCurrentDate()
    data['username'] = userSourceName
    data['seen'] = False
    data['new'] = True
    
    NotificationModel(**data).put()

def _generate_notification_key(username):
    userTargetKey = _get_user_key(username)
    notification_key = generateKey(NotificationModel, userTargetKey)
    return notification_key


def remove_like_notification(user_target, user_source, post_id):
    query_filter = lambda query: query.filter( NotificationModel.post_id == post_id )
    _remove_notification(NotificationType.LIKE, user_target, user_source, query_filter)
    
def remove_follow_notification(user_target, user_source):
    _remove_notification(NotificationType.FOLLOW, user_target, user_source)
    
def _remove_notification(notification_type, user_target, user_source, query_filter = lambda x: x):
    user_target_key = _get_user_key(user_target)
    notification_query = NotificationModel.query(ancestor=user_target_key)\
                        .filter(NotificationModel.type == notification_type)\
                        .filter(NotificationModel.username == user_source)
                        
    notification = query_filter(notification_query).get()                   
    notification.key.delete()

###### PULL NOTITIFICATIONS ######

def get_notifications_message(user):
    notifications = _get_user_notifications(user)
    notifications_messages = map(_to_notification_message, notifications)
    return NotificationsMessage(notifications=notifications_messages)

def _get_user_notifications(user):
    return NotificationModel.query(ancestor=user.key).order(-NotificationModel.date).fetch()

def _get_notification(user, notification_websafekey):
    #notification = NotificationModel.query(ancestor=user.key).filter(NotificationModel.key == ndb.Key(urlsafe=notification_websafekey)).get()
    notification_key = ndb.Key(urlsafe=notification_websafekey)
    notification = notification_key.get()
    
    user_target = notification_key.parent().id()
    if user_target == user.key.id():
        return notification
    else:
        raise ForbiddenException('Not your notification mofo')

def _to_notification_message(notification):
    print notification.type
    return NotificationMessage(
                id = notification.id,
                date = notification.date,
                type = notification.type,
                content = notification.content,
                seen = notification.seen,
                new = notification.new,
                post_id = notification.post_id,
                tipster = get_user_mini_form(notification.username)
            )

############

@ndb.transactional()
def reset_new_notifications(user):
    notifications = _get_user_notifications(user)
    for notification in notifications:
        notification.new = False
    ndb.put_multi(notifications)

@ndb.transactional()
def mark_notification_as_seen(user, notification_key):
    notification = _get_notification(user, notification_key)
    notification.seen = True
    notification.put()
    