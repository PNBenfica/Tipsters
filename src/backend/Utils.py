from __future__ import division
from random import randint
from datetime import datetime

def random_list_element(l):
    return l[randint(0,len(l) - 1)]

def average(array):
    if (len(array) == 0):
        return float(0)
    return sum(array) / len(array)


def getCurrentDate():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")