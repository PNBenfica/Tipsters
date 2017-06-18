
import UserManager
import PostManager
from UserManager import getUser
from sports.XMLOddsParser import parseXMLOdds
from models import TipForm, PostForm
from random import randint
from Utils import random_list_element
from sports.sportsPopulator import simulate_sports_results
import ChatManager

users = ["Aimar Bernardo", "Calado Diamantino", "Ederson Florentino", "Gamarra Hooijdonk", "Isaltino Jovic", "Kostas Lazar", "Mitroglou Nuno", "Otavio Preudhomme", "Renato Sanches", "Tamara Umbigo", "Xandao Zahovic"]
odds = parseXMLOdds()

def populate_datastore():
    #register_users()
    #add_profile_pictures()
    #follow_users()
    #add_posts()
    send_messages()
    #simulate_sports_results()


def register_users():
    for user in users:
        UserManager.register_user(user, user.replace(" ", "_") + "@hotmail.com", "12345")

def add_profile_pictures():
    for user in users:
        userModel = getUser(user)
        userModel.avatar = random_picture()
        userModel.about = random_about()
        userModel.put()

def random_picture():
    pictures = ["img/user1.jpg", "img/user2.jpg", "img/user3.jpg", "img/user4.jpg", "img/user5.jpg", "img/user6.jpg", "img/user7.jpg", "img/user8.jpg", "img/joaoalmeida.jpg", "img/pauloteixeira.jpg"]
    return random_list_element(pictures)

def random_about():
    abouts = ["O meu percurso enquanto trader profissional é o resultado de dois percursos distintos, um enquanto profissional em vários cargos na area do futebol e outro enquanto apostador…Largos anos de experiência ligado ao mundo do futebol, passagens como Treinador por diversos clubes, entre eles a formação do Sporting CP, por diversas agências de Gestão de Carreiras de jogadores profissionais de futebol, e na area do Scoutng (observação e captação de novos talentos)", "Sigo de volta", "Sou fortissimo, sigam-me", "Olá, tenho 22 anos e sou de Portugal. Qql coisa manda mensagem."]
    return random_list_element(abouts)

def follow_users():
    for user in users:
        usersToFollow = filter(lambda u: user != u and randint(0,10) > 4, users)
        for userToFollow in usersToFollow:
            UserManager.follow_user(getUser(user), userToFollow)

def add_posts():
    for user in users:
        for _ in range(0, randint(0,3)):
            post_key = insert_post(user)
            add_comments(post_key.urlsafe())
            add_likes(post_key.urlsafe())
                
def insert_post(user):
    return PostManager.storePost(getUser(user), PostForm(comment=random_coment(), tips=random_tips()))

def add_comments(post_key):
    for _ in range(0, randint(0,3)):
        PostManager.addCommentToPost(random_user(), post_key, random_post_coment())
        
def add_likes(post_key):
    for _ in range(0, randint(0,4)):
        PostManager.likePost(getUser(random_user()), post_key)

def random_user():
    return random_list_element(users)
    
def random_post_coment():
    comments = ["The home team has many injured so players!!", "This will be a green!!", "Benfica very strong they win for sure. Sporting very weak they lose", "This game will have many goals", "What a wonderful tip", "I ain't gonna follow that mofo","nice one dude","like"]
    return random_list_element(comments)

def random_coment():
    comments = ["The home team has many injured so players!!", "This will be a green!!", "Benfica very strong they win for sure. Sporting very weak they lose", "This game will have many goals", "Predicted line-up: A,B,C,D,E,F,G", "","",""]
    return random_list_element(comments)

def random_tips():
    return map(lambda x: random_tip(), range(randint(1,4)))

def random_tip():
    sport = random_list_element(odds)
    event = random_list_element(sport['events'])
    match = random_list_element(event['matches'])
    bet = random_list_element(match['bets'])
    choice = random_list_element(bet['choices'])
    return TipForm(sportId=sport['id'], leagueId=event['id'], matchId=match['id'], betId=bet['id'], choiceId=choice['id'] )


def send_messages():
    for _ in range(30):
        users = random_chat_partners()
        for i in range(randint(0,5)):
            ChatManager.send_message(users[i % 2], users[(i+1) % 2], random_chat_message())

def random_chat_partners():
    user1 = random_list_element(users)
    user2 = random_list_element(filter(lambda u: user1 != u, users))
    return [user1,user2]

def random_chat_message():
    messages = ["Oi gata", "td bein?", "partilha ai uma tip moleque", "burro do crl perdi por sua causa", "es o maior", "ya concordo", "tenho que discordar neste caso", "renato joga muito ya", "nao sei se bate, talvez", "bora bora"]
    return random_list_element(messages)
    