#!/usr/bin/env python

"""
Parses the odds retrieved from: http://xml.cdn.betclic.com/odds_en.xml
"""

import xml.etree.ElementTree as ET
import os.path
import urllib2

def parseSports(sportsRoot):
    return map(lambda sport: parseSport(sport), sportsRoot)
    #return parseElement(sportsRoot, "sports", parseSport)

def parseSport(sportRoot):
    return parseElement(sportRoot, "events", parseEvents)

def parseEvents(eventRoot):
    return parseElement(eventRoot, "matches", parseMatches)

def parseMatches(matchRoot):
    matchRoot.attrib["bets"] = parseBets(matchRoot[0])
    return matchRoot.attrib

def parseBets(betsRoot):
    return map(lambda child: parseBet(child), betsRoot)

def parseBet(betRoot):
    betRoot.attrib["choices"] = parseChoices(betRoot)
    return betRoot.attrib

def parseChoices(choicesRoot):
    return map(lambda choice: choice.attrib, choicesRoot)

def parseElement(element, childAttrName, childParseFunc):
    parsedElement = element.attrib
    element.attrib[childAttrName] = map(lambda child: childParseFunc(child), element)
    return parsedElement

def parseXMLOdds():
    #file = urllib2.urlopen('http://xml.cdn.betclic.com/odds_en.xml')    
    #http://web.ist.utl.pt/ist175449/odds_en2.xml
    #tree = ET.parse(file)
    
    tree = ET.parse(os.path.dirname(__file__) + '\odds_en2.xml')
    root = tree.getroot()
    return beautify(parseSports(root))
    #return [{'events': [{'matches': [{'bets': [{'bet': [{'choices': [[{'odd': '200.00', 'name': 'Algeria', 'id': '93332406'}], [{'odd': '9.00', 'name': 'Argentina', 'id': '93332409'}], [{'odd': '250.00', 'name': 'Australia', 'id': '93332412'}], [{'odd': '150.00', 'name': 'Austria', 'id': '93332415'}], [{'odd': '17.00', 'name': 'Belgium', 'id': '93332418'}], [{'odd': '500.00', 'name': 'Bolivia', 'id': '93332421'}], [{'odd': '100.00', 'name': 'Bosnia-Herzegovina', 'id': '93332424'}], [{'odd': '10.00', 'name': 'Brazil', 'id': '93332427'}], [{'odd': '250.00', 'name': 'Bulgaria', 'id': '93332430'}], [{'odd': '200.00', 'name': 'Cameroon', 'id': '93332433'}], [{'odd': '500.00', 'name': 'Canada', 'id': '93332436'}], [{'odd': '25.00', 'name': 'Chile', 'id': '93332439'}], [{'odd': '500.00', 'name': 'China', 'id': '93332442'}], [{'odd': '30.00', 'name': 'Colombia', 'id': '93332445'}], [{'odd': '250.00', 'name': 'Costa Rica', 'id': '93332448'}], [{'odd': '50.00', 'name': 'Croatia', 'id': '93332451'}], [{'odd': '100.00', 'name': 'Czech Republic', 'id': '93332454'}], [{'odd': '100.00', 'name': 'Denmark', 'id': '93332457'}], [{'odd': '150.00', 'name': 'Ecuador', 'id': '93332460'}], [{'odd': '500.00', 'name': 'Egypt', 'id': '93332463'}], [{'odd': '17.00', 'name': 'England', 'id': '93332466'}], [{'odd': '10.00', 'name': 'France', 'id': '93332469'}], [{'odd': '6.50', 'name': 'Germany', 'id': '93332472'}], [{'odd': '150.00', 'name': 'Ghana', 'id': '93332475'}], [{'odd': '200.00', 'name': 'Greece', 'id': '93332478'}], [{'odd': '500.00', 'name': 'Honduras', 'id': '93332481'}], [{'odd': '250.00', 'name': 'Hungary', 'id': '93332484'}], [{'odd': '500.00', 'name': 'Iceland', 'id': '93332487'}], [{'odd': '500.00', 'name': 'Iran', 'id': '93332490'}], [{'odd': '500.00', 'name': 'Iraq', 'id': '93332493'}], [{'odd': '500.00', 'name': 'Israel', 'id': '93332496'}], [{'odd': '17.00', 'name': 'Italy', 'id': '93332499'}], [{'odd': '100.00', 'name': 'Ivory Coast', 'id': '93332502'}], [{'odd': '150.00', 'name': 'Japan', 'id': '93332505'}], [{'odd': '80.00', 'name': 'Mexico', 'id': '93332508'}], [{'odd': '200.00', 'name': 'Montenegro', 'id': '93332511'}], [{'odd': '25.00', 'name': 'Netherlands', 'id': '93332517'}], [{'odd': '500.00', 'name': 'New Zealand', 'id': '93332520'}], [{'odd': '150.00', 'name': 'Nigeria', 'id': '93332523'}], [{'odd': '500.00', 'name': 'North Korea', 'id': '93332526'}], [{'odd': '250.00', 'name': 'Paraguay', 'id': '93332529'}], [{'odd': '500.00', 'name': 'Peru', 'id': '93332532'}], [{'odd': '80.00', 'name': 'Poland', 'id': '93332535'}], [{'odd': '30.00', 'name': 'Portugal', 'id': '93332538'}], [{'odd': '500.00', 'name': 'Qatar', 'id': '93332541'}], [{'odd': '250.00', 'name': 'Ireland', 'id': '93332544'}], [{'odd': '200.00', 'name': 'Romania', 'id': '93332547'}], [{'odd': '35.00', 'name': 'Russia', 'id': '93332550'}], [{'odd': '500.00', 'name': 'Saudi Arabia', 'id': '93332553'}], [{'odd': '500.00', 'name': 'Scotland', 'id': '93332556'}], [{'odd': '100.00', 'name': 'Serbia', 'id': '93332559'}], [{'odd': '250.00', 'name': 'Slovakia', 'id': '93332562'}], [{'odd': '500.00', 'name': 'Slovenia', 'id': '93332565'}], [{'odd': '500.00', 'name': 'South Africa', 'id': '93332568'}], [{'odd': '200.00', 'name': 'South Korea', 'id': '93332571'}], [{'odd': '10.00', 'name': 'Spain', 'id': '93332574'}], [{'odd': '100.00', 'name': 'Sweden', 'id': '93332577'}], [{'odd': '100.00', 'name': 'Switzerland', 'id': '93332580'}], [{'odd': '250.00', 'name': 'Tunisia', 'id': '93332583'}], [{'odd': '100.00', 'name': 'Turkey', 'id': '93332586'}], [{'odd': '80.00', 'name': 'United States', 'id': '93332589'}], [{'odd': '100.00', 'name': 'Ukraine', 'id': '93332592'}], [{'odd': '40.00', 'name': 'Uruguay', 'id': '93332595'}], [{'odd': '500.00', 'name': 'Venezuela', 'id': '93332598'}], [{'odd': '100.00', 'name': 'Wales', 'id': '93332601'}], [{'odd': '500.00', 'name': 'Morocco', 'id': '93332617'}]], 'code': 'Ftb_Win', 'name': 'Outright Winner', 'id': '12961044'}]}], 'name': 'World Cup 2018', 'start_date': '2018-07-08T18:00:00', 'streaming': '0', 'live_id': '', 'id': '756867'}], 'name': 'World Cup', 'id': '1'}], 'name': 'Football', 'id': '1'}]
#print(parseXMLOdds())

#Replaces %1% and %2% for home team and away team
def replaceDefaultTeamNames(match, choice):
    if "%1%" in choice["name"] :
        homeTeam = match["name"].split(' - ')[0]
        choice["name"] = choice["name"].replace("%1%", homeTeam)
    if "%2%" in choice["name"]:
        awayTeam = match["name"].split(' - ')[1]
        choice["name"] = choice["name"].replace("%2%", awayTeam)

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