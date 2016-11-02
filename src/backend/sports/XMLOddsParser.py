#!/usr/bin/env python

"""
Parses the odds retrieved from: http://xml.cdn.betclic.com/odds_en.xml
"""

import xml.etree.ElementTree as ET
import os.path
import urllib2

from ..domain import ChoiceStatus, MatchStatus

def parseXMLOdds():
    #file = urllib2.urlopen('http://xml.cdn.betclic.com/odds_en.xml')
    #tree = ET.parse(file)    
    tree = ET.parse(os.path.dirname(__file__) + '\odds_en_small.xml')
    sports = parseSports(tree.getroot())
    sports = filterSports(sports)
    return beautify(sports)

def parseSports(sportsRoot):
    return map(lambda sport: parseSport(sport), sportsRoot)

def parseSport(sportRoot):
    return parseElement(sportRoot, "events", parseEvents)

def parseEvents(eventRoot):
    return parseElement(eventRoot, "matches", parseMatches)

def parseMatches(matchRoot):
    matchRoot.attrib["bets"] = parseBets(matchRoot[0])
    matchRoot.attrib["status"] = MatchStatus.PRELIVE
    return matchRoot.attrib

# @param betsRoot - bets xml element
# @return list of bets
def parseBets(betsRoot):
    return map(lambda child: parseBet(child), betsRoot)

# @param betRoot - bet xml element
def parseBet(betRoot):
    betRoot.attrib["choices"] = parseChoices(betRoot)
    return betRoot.attrib

# @param choicesRoot - choices xml element
# @return list of choices
def parseChoices(choicesRoot):
    return map(lambda choice: parseChoice(choice), choicesRoot)

# @desc - maps each xml choice directly returning all is attributes
# @param choiceRoot - choice xml element
def parseChoice(choiceRoot):
    choiceRoot.attrib["status"] = ChoiceStatus.PENDENT
    choiceRoot.attrib["postsKeys"] = []
    return choiceRoot.attrib

# @param element - xml element being parsed
# @param childAttrName - name of the child attribute ("sport" childAttrName is "event")
# @param childParseFunc - the function that parses the child xml element
def parseElement(element, childAttrName, childParseFunc):
    parsedElement = element.attrib
    element.attrib[childAttrName] = map(lambda child: childParseFunc(child), element)
    return parsedElement

# filters the sport list, so that it only contains the supported sport list
def filterSports(sports):
    sportNames = [ "Formula 1", "Basketball", "Motorcycling", "Tennis", "Football" ]
    return filter(lambda sport: sport["name"] in sportNames, sports)

def beautify(sports):
    for sport in sports:
        for event in sport["events"]:
            for match in event["matches"]:
                for bet in match["bets"]:
                    for choice in bet["choices"]:
                        if ("%1%" in choice["name"]) or ("%2%" in choice["name"]):
                            replaceDefaultTeamNames(match, choice)
                            
                match["bets"] = filter(lambda bet: bet["choices"], match["bets"])
            event["matches"] = filter(lambda match: match["bets"], event["matches"])
        sport["events"] = filter(lambda event: event["matches"], sport["events"])
    return sports

#Replaces %1% and %2% for home team and away team
def replaceDefaultTeamNames(match, choice):
    return
    #if "%1%" in choice["name"] :
    #    homeTeam = match["name"].split(' - ')[0]
    #    choice["name"] = choice["name"].replace("%1%", homeTeam)
    #if "%2%" in choice["name"]:
    #    awayTeam = match["name"].split(' - ')[1]
    #    choice["name"] = choice["name"].replace("%2%", awayTeam)