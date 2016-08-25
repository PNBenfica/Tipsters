#!/usr/bin/env python

"""
Parses the odds retrieved from: http://xml.cdn.betclic.com/odds_en.xml
"""

import xml.etree.ElementTree as ET

def parseSports(sportsRoot):
    return parseElement(sportsRoot, "events", parseEvents)

def parseEvents(sportRoot):
    return parseElement(sportRoot, "matches", parseMatches)

def parseMatches(eventRoot):
    return parseElement(eventRoot, "bets", parseBets)

def parseBets(betsRoot):
    return parseElement(betsRoot, "bet", parseBet)

def parseBet(betRoot):
    return parseElement(betRoot, "choices", parseChoices)

def parseChoices(choicesRoot):
    return map(lambda choice: [choice.attrib], choicesRoot)

def parseElement(element, childAttrName, childParseFunc):
    childs = []
    for child in element:
        child.attrib[childAttrName] = childParseFunc(child)
        childs += [child.attrib]
    return childs

def parseXMLOdds():
    tree = ET.parse('odds_en2.xml')
    root = tree.getroot()

    return parseSports(root)