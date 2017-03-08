
import UserManager
import PostManager
from UserManager import getUser
from sports.XMLOddsParser import parseXMLOdds
from models import TipForm, PostForm
from random import randint

users = ["Aimar Bernardo", "Calado Diamantino", "Ederson Florentino", "Gamarra Hooijdonk", "Isaltino Jovic", "Kostas Lazar", "Mitroglou Nuno", "Otavio Preudhomme", "Renato Sanches", "Tamara Umbigo", "Xandao Zahovic"]
odds = parseXMLOdds()

def populate_datastore():
    #register_users()
    #follow_users()
    add_posts()


def register_users():
    for user in users:
        UserManager.register_user(user, user.replace(" ", "_") + "@hotmail.com", "12345")

def follow_users():
    for user in users:
        usersToFollow = filter(lambda u: user != u and randint(0,10) > 4, users)
        for userToFollow in usersToFollow:
            UserManager.follow_user(getUser(user), userToFollow)

def add_posts():
    for user in users:
        PostManager.storePost(getUser(user), PostForm(comment=random_coment(), tips=random_tips()))

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

def random_list_element(l):
    return l[randint(0,len(l) - 1)]

