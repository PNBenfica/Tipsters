import React from "react";
import { connect } from "react-redux";

import { fetchTables } from "../actions/sportsActions";

import BetSlip from "../components/sports/betslip/BetSlip";
import Breadcrumb from "../components/sports/Breadcrumb";
import GoalsScorersTable from "../components/sports/tables/GoalsScorersTable";
import OneColumnTable from "../components/sports/tables/OneColumnTable";
import TwoColumnsTable from "../components/sports/tables/TwoColumnsTable";
import ThreeColumnsTable from "../components/sports/tables/ThreeColumnsTable";
import MatchesTable from "../components/sports/tables/MatchesTable";
import SportTable from "../components/sports/tables/SportTable";
import StandardOptionsTable from "../components/sports/tables/StandardOptionsTable";
import TipsOnThisEvent from "../components/sports/chatpanel/TipsOnThisEvent";

@connect((store) => {
  return {
    tables: store.sports.tables,
    fetched: store.sports.fetched,
    fetching: store.sports.fetching,
  };
})
export default class Sports extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = { betSlip : { tips: [], sellingPrice : 0 }};
    }
    
    componentWillMount() {
        const {sportCode, leagueCode, matchCode} = this.props.params;
        this.props.dispatch(fetchTables({sportCode, leagueCode, matchCode}))
    }

    componentWillReceiveProps(nextProps) {
        const {sportCode, leagueCode, matchCode} = nextProps.params;

        if (sportCode !== this.props.params.sportCode || leagueCode !== this.props.params.leagueCode  || matchCode !== this.props.params.matchCode){
            this.props.dispatch(fetchTables({sportCode, leagueCode, matchCode}));
        }
    }

    /***** Bet Slip *****/

    updateSellingPrice(sellingPrice){
        this.setState({sellingPrice});
    }

    alreadyTipOnEvent(event){
    	let eventsList = this.state.betSlip.tips.map((tip) => tip.event);
		return this.state.betSlip.tips.map((tip) => tip.event).indexOf(event) !== -1;
    }

    addTip(selection, event, odd){
        if (this.state.betSlip.tips.length < 14 && !this.alreadyTipOnEvent(event)){
            this.state.betSlip.tips = [ ...this.state.betSlip.tips, {selection, event, odd}];
            this.setState({betSlip: this.state.betSlip});
        }
    }

    removeTip(index){
        this.state.betSlip.tips = this.state.betSlip.tips.filter((_, i) => i !== index);
        this.setState({
            betSlip: this.state.betSlip
        });
    }

    /***** Bet Slip *****/

    /* renders tha tables as well as returns the sport/league/match names */
    renderTables(data, sportCode, leagueCode, matchCode){        
        let response = {"sport" : data.name}
        if (data.events.length === 1) {
            response.league = data.events[0].name
            
            if ((typeof data.events[0].matches !== 'undefined') && (data.events[0].matches.length === 1) && (typeof matchCode !== 'undefined') ){
                response.match = data.events[0].matches[0].name
                response.Tables = this.renderMatch(data)
            }
            else{                    
                response.Tables = this.renderLeague(data)
            }
        }
        else {
            response.Tables = this.renderSport(data)
        }
        return response
    }

    renderGenericTable(title, events, ref, i=0){
        return <SportTable key={i} title={title} events={events.sort((a, b) => a.name.localeCompare(b.name))} baseRef={ref}/>
    }

    renderSport(sport){
        return this.renderGenericTable("Leagues", sport.events,  sport.name + "/" + sport.id)
    }

    renderLeague(data){
        const league = data.events[0]
        const baseRef = data.name + "/" + data.id + "/" + league.name + "/" + league.id
        let days = league.matches.map((match) => match.start_date.split("T")[0]) // get all the day of the events
        days = [ ...new Set(days) ]; // remove duplicates
        return days.map((day, i) => {
            const matches = league.matches.filter(match =>match.start_date.split("T")[0] === day )
            const isSpecialBets = (matches.length === 1) && (["Relegation", "Place 1-4", "Outright Winner", "Winner", "Drivers Championship Winner", "Constructors Championship"].includes(matches[0].bets[0].name))
            if (isSpecialBets){
                matches[0].bets.forEach(bet => bet.id = matches[0].id)
                return this.renderGenericTable("League bets", matches[0].bets, baseRef, i)
            }
            else
                return <MatchesTable key={i} baseRef={baseRef} date={day} matches={matches} addTip={this.addTip.bind(this)}/>})
    }

    renderMatch(data){
        const tablesMap = {"Match Result": (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Half-Time Result": (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Total Goals": (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Number of Goals": (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Double Chance": (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "First Team To Score": (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i), 
                           "Half-Time / Full-Time": (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Handicap" : (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Correct Score" : (eventName, bet, i) => this.renderCorrectScore(eventName, bet, i),
                           "Half-Time Correct Score" : (eventName, bet, i) => this.renderCorrectScore(eventName, bet, i),
                           "Goalscorers" : (eventName, bet, i) => this.renderGoalscorers(eventName, bet.bets, i),
                           "Outright Winner" : (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Place 1-4" : (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Relegation" : (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Over/Under" : (eventName, bet, i) => this.renderTwoColumnsTable(eventName, bet, i, [(choice => choice.name.includes("Over")), (choice => choice.name.includes("Under"))]),
                           
                           "Total Sets" : (eventName, bet, i) => this.renderTwoColumnsTable(eventName, bet, i),
                           "Total Games" : (eventName, bet, i) => this.renderTwoColumnsTable(eventName, bet, i),
                           "Match Winner" : (eventName, bet, i) => this.renderTwoColumnsTable(eventName, bet, i),

                           "Drivers Championship Winner" : (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Constructors Championship" : (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),
                           "Winner" : (eventName, bet, i) => this.renderStandardOptionsTable(eventName, bet, i),

                        }
        let match = data.events[0].matches[0]
        let specialBets = match.bets.filter(bet => ["Goalscorer", "First Goalscorer", "Last Goalscorer"].includes(bet.name))
        if (specialBets.length > 0){
            specialBets = {name: "Goalscorers", bets: specialBets}
            match.bets = match.bets.filter(bet => !(["Goalscorer", "First Goalscorer", "Last Goalscorer"].includes(bet.name)))
            match.bets.push(specialBets)
        }
        return match.bets.map((bet,i) => tablesMap[bet.name](match.name, bet, i))
    }

    renderGoalscorers(eventName, bets, i){
        return <GoalsScorersTable key={i} eventName={eventName} bets={bets} addTip={this.addTip.bind(this)}/>
    }

    renderOneColumnTable(eventName, bet, i){
        return <OneColumnTable key={i} eventName={eventName} bet={bet} addTip={this.addTip.bind(this)}/>
    }

    /* filters will map the choices to the respective column */
    renderTwoColumnsTable(eventName, bet, i, filters=[]){
        return <TwoColumnsTable key={i} eventName={eventName} bet={bet} filters={filters} addTip={this.addTip.bind(this)}/>
    }

    renderThreeColumnsTable(eventName, bet, i, filters){
        return <ThreeColumnsTable key={i} eventName={eventName} bet={bet} filters={filters} addTip={this.addTip.bind(this)}/>
    }
  	
    renderStandardOptionsTable(eventName, bet, i){
        return <StandardOptionsTable key={i} eventName={eventName} bet={bet} addTip={this.addTip.bind(this)}/>
    }

    renderCorrectScore(eventName, bet, i){ 
        bet.choices.forEach(choice => choice.result = choice.name.replace(/ /g,'').split("-").map(el=>parseInt(el)) ) /* "1 - 0" => [1,0] */
        const filters = [(choice => choice.result[0] > choice.result[1]), (choice => choice.result[0] == choice.result[1]), (choice => choice.result[0] < choice.result[1])]
        return this.renderThreeColumnsTable(eventName, bet, i, filters)
    }

  	render() {

	  	let {sport = "Football", sportCode = "1", league, leagueCode, match, matchCode}  = this.props.params;

	    let data = this.props.tables;

        let Loading = []
        let Tables = []
        if (this.props.fetching) {
            Loading =(   <div class="cssload-container">
                            <div class="cssload-whirlpool"></div>
                        </div>)
        }
        else if (this.props.fetched){
            ({Tables, sport, league, match}  = this.renderTables(data,sportCode, leagueCode, matchCode))
        }

	    return (

	        <div class="row">

	            <div class="league-tables col-lg-8 sports-table-container">
	                
	                <Breadcrumb sport={sport} sportCode={sportCode} league={league} leagueCode={leagueCode} match={match} matchCode={matchCode}/>	                

	                {Tables}
                    {Loading}
	            </div>


	            <div class="col-lg-4 hidden-md hidden-sm hidden-xs right-sports-bar-container">

	            	<BetSlip {...this.state.betSlip} updateSellingPrice={this.updateSellingPrice.bind(this)} removeTip={this.removeTip.bind(this)}/>

	                <TipsOnThisEvent />

	            </div>
	        </div>
	    );
  	}
}
