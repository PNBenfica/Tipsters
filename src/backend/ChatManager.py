from google.appengine.ext import ndb
from models import ChatsMessage, ChatMessage, SingleChatMessage, ChatMessageModel, ChatModel, UserChatStatusModel
from gaeUtils import generateKey, put_multi
from Utils import getCurrentDate
from UserManager import get_user_mini_form

def get_chats_message(username):
    chats = _get_chats(username)
    print chats
    messages = map(lambda chat: _to_chat_message(chat, username), chats)
    messages.sort(key=lambda message: message.messages[0].date, reverse=True)
    return ChatsMessage(messages = messages)

def _to_chat_message(chat, username):
    print(username)
    chat_partner = _get_chat_partner(chat, username)
    print(chat_partner)
    messages = _get_chat_messages(chat)
    user_chat_status = _get_user_status(chat, username)
    print(user_chat_status)
    return ChatMessage(tipster=get_user_mini_form(chat_partner),messages= map(_to_chat_single_message, messages),seen=user_chat_status.seen, new=user_chat_status.new )

def _get_chat_partner(chat, current_user):
    partner = chat.user1
    if (partner == current_user):
        partner = chat.user2
    return partner

def _get_chat_messages(chat):
    return ChatMessageModel.query(ancestor=chat.key).order(-ChatMessageModel.date)

def _to_chat_single_message(message):
    return SingleChatMessage(author=message.author, content=message.content, date=message.date)

def send_message(usernameFrom, usernameTo, message):
    chat = _get_chat(usernameFrom, usernameTo)
    messageKey = generateKey(ChatMessageModel, chat.key)
    messageData = { "key" : messageKey, "author" : usernameFrom, "content" : message, "date" : getCurrentDate() }
    ChatMessageModel(**messageData).put()
    
    _reset_user_chat_status(chat, usernameTo)


def _get_chats(username):
    return ChatModel.query(ndb.OR(ChatModel.user1 == username, ChatModel.user2 == username)).fetch()
    
def _get_chat(user1, user2):
    users = [user1,user2]
    chat = ChatModel.query(ChatModel.user1.IN(users), ChatModel.user2.IN(users)).get()
    if not chat:
        chat = _create_chat(user1, user2).get()
    return chat
        
def _create_chat(user1, user2):
    chat_key = ChatModel(user1=user1, user2=user2).put()
    _create_users_chat_status(chat_key, user1, user2)
    return chat_key


def _create_users_chat_status(chat_key, user1, user2):
    _create_user_chat_status(chat_key, user1)
    _create_user_chat_status(chat_key, user2)
    
def _create_user_chat_status(chat_key, username):
    status_key = generateKey(UserChatStatusModel, chat_key)
    status_data = { "key" : status_key, "name" : username, "seen" : False, "new" : True }
    UserChatStatusModel(**status_data).put()
    
def _reset_user_chat_status(chat, username):
    status = _get_user_status(chat, username)
    status.seen = False
    status.new = True
    status.put()

def _get_users_chat_stats(chat):
    return UserChatStatusModel.query(ancestor=chat.key).fetch()

def _get_user_status(chat, username):
    status = _get_users_chat_stats(chat)
    for user_status in status:
        if user_status.name == username:
            return user_status

def reset_new_messages(username):
    status = UserChatStatusModel.query(UserChatStatusModel.name==username).fetch()
    for user_status in status:
        user_status.new = False
    put_multi(status)

def mark_message_as_seen(current_user, chat_partner_user):
    chat = _get_chat(current_user, chat_partner_user)
    user_status = _get_user_status(chat, current_user)
    user_status.seen = True
    user_status.new = False
    user_status.put()
