from domain import NotificationType
from models import NotificationModel, NotificationMessage, NotificationsMessage
from gaeUtils import generateKey
from UserManager import _get_user_key, get_user_mini_form
from Utils import getCurrentDate


###### PUSH NOTITIFICATIONS ######

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



###### PULL NOTITIFICATIONS ######

def get_notifications_message(user):
    notifications = _get_user_notifications(user)
    print len(notifications)
    notifications_messages = map(_to_notification_message, notifications)
    return NotificationsMessage(notifications=notifications_messages)

def _get_user_notifications(user):
    return NotificationModel.query(ancestor=user.key).order(-NotificationModel.date).fetch()

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
