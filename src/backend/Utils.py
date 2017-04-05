from __future__ import division
from random import randint

def random_list_element(l):
    return l[randint(0,len(l) - 1)]

def average(array):
    if (len(array) == 0):
        return float(0)
    return sum(array) / len(array)