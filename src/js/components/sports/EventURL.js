import React from "react";

// this class will be used to store and render url paths (/sport/sportCode/league/leagueCode/event/eventCode)
export default class EventURL {

	constructor(sport, league, match){
        this.sport = {name: sport.name, id: sport.id}
        if (typeof league !== 'undefined'){
            this.league = {name: league.name, id: league.id}
            if (typeof match !== 'undefined'){
                this.match = {name: match.name, id: match.id}
            }
        }
	}

	add(name, id){
		if (typeof this.league === 'undefined')
			return this.addLeague({name, id})
		else if (typeof this.match === 'undefined')
			return this.addMatch({name, id})
	}

	addLeague(league){
		return new EventURL(this.sport, league)
	}

	addMatch(match){
		return new EventURL(this.sport, this.league, match)
	}

	getMatchName(){
		return this.match.name
	}

  	renderPath() {
  		let path = "#/sports/";
  		[this.sport, this.league, this.match].forEach(ele => path += this.renderElement(ele) )
  		return path
  	}

  	renderElement(ele){
  		return (typeof ele !== 'undefined') ? ele.name.replace(/\//g, '') +"/"+ ele.id +"/" : ""
  	}
}
