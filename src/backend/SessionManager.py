'''
Module responsible for managing the current session tokens
'''

import os
import endpoints
import datetime
from Crypto.Random import random
from UserManager import getUser, getUserByToken

  
        
def get_current_user():
    #authToken = self.request_state.headers.get('authorization')
    authToken = os.getenv( 'HTTP_AUTHORIZATION' )
    print(authToken)
    return getUser("paulo")
    
    user = getUserByToken(authToken)
    
    if user and _isTokenValid(user.authTokenDate):
        return user
    else:
        raise endpoints.UnauthorizedException("Not logged in")
    
def _isTokenValid(tokenCreationDate):
    tokenDate = datetime.datetime.strptime(tokenCreationDate, "%Y-%m-%d %H:%M:%S")
    expiringDate = tokenDate + datetime.timedelta(days=1)
    return datetime.datetime.now() < expiringDate
        
def generateAuthToken():
    """ Generate a 32-char alnum string. 190 bits of entropy. """
    alnum = ''.join(c for c in map(chr, range(256)) if c.isalnum())
    return ''.join(random.choice(alnum) for _ in range(32))