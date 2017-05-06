from google.appengine.ext import ndb
from models import ChatsMessage, ChatMessage, SingleChatMessage, UserMiniForm, ChatMessageModel, ChatModel
from gaeUtils import generateKey
from Utils import getCurrentDate
from UserManager import get_user_mini_form

def get_chats_message(username):
    chats = _get_chats(username)
    messages = map(lambda chat: _to_chat_message(chat, username), chats)
    return ChatsMessage(messages = messages)

def _fetch_messages(user):
    return []

def _to_chat_message(chat, username):
    chat_partner = _get_chat_partner(chat, username)
    messages = _get_chat_messages(chat)
    print(messages)
    return ChatMessage(tipster=get_user_mini_form(chat_partner),messages= map(_to_chat_single_message, messages),seen=chat.seen, new=chat.new )

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
    
    chat.seen = False
    chat.new = True
    chat.put()
    
def _get_chats(username):
    return ChatModel.query(ndb.OR(ChatModel.user1 == username, ChatModel.user2 == username)).fetch()
    
def _get_chat(user1, user2):
    users = [user1,user2]
    chat = ChatModel.query(ChatModel.user1.IN(users), ChatModel.user2.IN(users)).get()
    if not chat:
        chat = _create_chat(user1, user2)
    return chat
        
def _create_chat(user1, user2):
    return ChatModel(user1=user1, user2=user2).put()