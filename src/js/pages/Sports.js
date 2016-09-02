import React from "react";
import { connect } from "react-redux";

import { fetchTables } from "../actions/sportsActions";

import BetSlip from "../components/sports/betslip/BetSlip";
import Breadcrumb from "../components/sports/Breadcrumb";
import StandardOptionsTable from "../components/sports/footballTables/StandardOptionsTable";
import OneColumnTable from "../components/sports/footballTables/OneColumnTable";
import TwoColumnsTable from "../components/sports/footballTables/TwoColumnsTable";
import ThreeColumnsTable from "../components/sports/footballTables/ThreeColumnsTable";
import MatchesTable from "../components/sports/MatchesTable";
import SportTable from "../components/sports/SportTable";
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
            const isSpecialBets = (matches.length === 1) && (["Relegation", "Place 1-4", "Outright Winner"].includes(matches[0].bets[0].name))
            if (isSpecialBets){
                // matches[0].bets.name = matches[0].name; matches[0].bets.code = matches[0].code
                matches[0].bets.forEach(bet => bet.id = matches[0].id)
                // console.log(matches[0].bets)
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
                           "Over/Under" : (eventName, bet, i) => this.renderTwoColumnsTable(eventName, bet, i, [(choice => choice.name.includes("Over")), (choice => choice.name.includes("Under"))]),
                           "Correct Score" : (eventName, bet, i) => this.renderCorrectScore(eventName, bet, i),
                           "Half-Time Correct Score" : (eventName, bet, i) => this.renderCorrectScore(eventName, bet, i),
                           "Goalscorer" : (eventName, bet, i) => this.renderOneColumnTable(eventName, bet, i),
                           "First Goalscorer" : (eventName, bet, i) => this.renderOneColumnTable(eventName, bet, i),
                           "Last Goalscorer" : (eventName, bet, i) => this.renderOneColumnTable(eventName, bet, i),
                        }
        const match = data.events[0].matches[0]
        return match.bets.map((bet,i) => tablesMap[bet.name](match.name, bet, i))
        // return [tablesMap["Handicap"]("Benfica - Sporting", {"name": "Handicap", choices:[{"name":"Benfica -3", odd:"21.00"}, {"name":"Draw (Benfica -3)", odd:"12.00"}, {"name":"Sporting +3", odd:"1.03"}, {"name":"Benfica -2", odd:"10.00"}, {"name":"Draw (Benfica -2)", odd:"6.75"}, {"name":"Sporting +2", odd:"1.16"}, {"name":"Benfica -1", odd:"4.75"}, {"name":"Draw (Benfica -1)", odd:"3.90"}, {"name":"Sporting +1", odd:"1.52"}, {"name":"Benfica +1", odd:"1.38"}, {"name":"Draw (Benfica +1)", odd:"4.50"}, {"name":"Sporting -1", odd:"6.00"}, {"name":"Benfica +2", odd:"1.10"}, {"name":"Draw (Benfica +2)", odd:"8.25"}, {"name":"Sporting -2", odd:"12.50"}, {"name":"Benfica +3", odd:"1.01"}, {"name":"Draw (Benfica +3)", odd:"16.00"}, {"name":"Sporting -3", odd:"26.00"}]}),
        //             tablesMap["Half-Time / Full-Time"]("Benfica - Sporting", {"name": "Half-Time / Full-Time", choices:[{"name":"Benfica / Benfica", "odd":"4.00"}, {"name":"Benfica / Draw", "odd":"11.50"}, {"name":"Benfica / Sporting", "odd":"19.00"}, {"name":"Draw / Benfica", "odd":"5.60"}, {"name":"Draw / Draw", "odd":"5.00"}, {"name":"Draw / Sporting", "odd":"6.50"}, {"name":"Sporting / Benfica", "odd":"17.00"}, {"name":"Sporting / Draw", "odd":"11.00"}, {"name":"Sporting / Sporting", "odd":"4.90"}]}),
        //             tablesMap["Over/Under"]("Benfica - Sporting", {"name": "Over/Under", choices:[{"name":"Over 0.5", "odd":"1.04"}, {"name":"Under 0.5", "odd":"9.00"}, {"name":"Over 1.5", "odd":"1.25"}, {"name":"Under 1.5", "odd":"3.75"}, {"name":"Over 2.5", "odd":"1.75"}, {"name":"Under 2.5", "odd":"2.00"}, {"name":"Over 3.5", "odd":"2.90"}, {"name":"Under 3.5", "odd":"1.40"}, {"name":"Over 4.5", "odd":"5.00"}, {"name":"Under 4.5", "odd":"1.15"}, {"name":"Over 5.5", "odd":"9.00"}, {"name":"Under 5.5", "odd":"1.05"}]}),
        //             tablesMap["Correct Score"]("Benfica - Sporting", {"name": "Correct Score", choices:[{name:"1 - 0", odd:"8.75"}, {name:"2 - 0", odd:"11.50"}, {name:"2 - 1", odd:"8.50"}, {name:"3 - 0", odd:"22.00"}, {name:"3 - 1", odd:"16.00"}, {name:"3 - 2", odd:"20.00"}, {name:"4 - 0", odd:"41.00"}, {name:"4 - 1", odd:"34.00"}, {name:"4 - 2", odd:"40.00"}, {name:"4 - 3", odd:"60.00"}, {name:"5 - 0", odd:"95.00"}, {name:"5 - 1", odd:"80.00"}, {name:"5 - 2", odd:"91.00"}, {name:"5 - 3", odd:"125.00"}, {name:"5 - 4", odd:"175.00"}, {name:"6 - 0", odd:"175.00"}, {name:"6 - 1", odd:"126.00"}, {name:"6 - 2", odd:"175.00"}, {name:"6 - 3", odd:"250.00"}, {name:"7 - 0", odd:"250.00"}, {name:"7 - 1", odd:"250.00"}, {name:"8 - 0", odd:"250.00"}, {name:"8 - 1", odd:"250.00"}, {name:"9 - 0", odd:"250.00"}, {name:"10 - 0", odd:"250.00"}, {name:"0 - 0", odd:"11.00"}, {name:"1 - 1", odd:"6.25"}, {name:"2 - 2", odd:"10.50"}, {name:"3 - 3", odd:"32.00"}, {name:"4 - 4", odd:"101.00"}, {name:"5 - 5", odd:"250.00"}, {name:"0 - 1", odd:"10.00"}, {name:"0 - 2", odd:"14.50"}, {name:"1 - 2", odd:"9.50"}, {name:"0 - 3", odd:"29.00"}, {name:"1 - 3", odd:"19.00"}, {name:"2 - 3", odd:"22.00"}, {name:"0 - 4", odd:"55.00"}, {name:"1 - 4", odd:"40.00"}, {name:"2 - 4", odd:"46.00"}, {name:"3 - 4", odd:"60.00"}, {name:"0 - 5", odd:"101.00"}, {name:"1 - 5", odd:"95.00"}, {name:"2 - 5", odd:"100.00"}, {name:"3 - 5", odd:"125.00"}, {name:"4 - 5", odd:"175.00"}, {name:"0 - 6", odd:"201.00"}, {name:"1 - 6", odd:"175.00"}, {name:"2 - 6", odd:"200.00"}, {name:"3 - 6", odd:"250.00"}, {name:"0 - 7", odd:"250.00"}, {name:"1 - 7", odd:"250.00"}, {name:"0 - 8", odd:"250.00"}, {name:"1 - 8", odd:"250.00"}, {name:"0 - 9", odd:"250.00"}, {name:"0 - 10", odd:"250.00"}]}),
        //             tablesMap["Match Result"]("Benfica - Sporting", {name:"Match Result", choices:[{name:"Benfica",odd:"1.33"},{name:"X",odd:"1.33"},{name:"Sporting",odd:"1.33"}]}),
        //             tablesMap["Half-Time Result"]("Benfica - Sporting", {name:"Half-Time Result", choices:[{name:"Benfica",odd:"1.33"},{name:"X",odd:"1.33"},{name:"Sporting",odd:"1.33"}]}),
        //             tablesMap["Total Goals"]("Benfica - Sporting", {name:"Total Goals", choices:[{name:"0 - 1",odd:"1.33"},{name:"2 - 3",odd:"1.33"},{name:"4+",odd:"1.33"}]}),
        //             tablesMap["Number of Goals"]("Benfica - Sporting", {name:"Number of Goals", choices:[{name:"0",odd:"1.33"},{name:"1",odd:"1.33"},{name:"2",odd:"1.33"},{name:"3",odd:"1.33"},{name:"4",odd:"1.33"},{name:"5+",odd:"1.33"}]}),
        //             tablesMap["Double Chance"]("Benfica - Sporting", {name:"Double Chance", choices:[{name:"Benfica or X",odd:"1.33"},{name:"Benfica or Sporting",odd:"1.33"},{name:"X or Sporting",odd:"1.33"}]}),
        //             tablesMap["First Team To Score"]("Benfica - Sporting", {name:"First Team To Score", choices:[{name:"Benfica",odd:"1.33"},{name:"Sporting",odd:"1.33"},{name:"No goal",odd:"1.33"}]}),
        //             tablesMap["First Goalscorer"]("Benfica - Sporting", {"name": "First Goalscorer", choices:[{"name":"No Goalscorer", odd:"10.00"}, {"name":"Harry Kane", odd:"5.50"}, {"name":"Daniel Sturridge", odd:"6.50"}, {"name":"Divock Origi", odd:"7.50"}, {"name":"Vincent Janssen", odd:"7.00"}, {"name":"Dele Alli", odd:"8.50"}, {"name":"Érik Lamela", odd:"8.50"}, {"name":"Heung Min Son", odd:"8.50"}, {"name":"Roberto Firmino", odd:"8.50"}, {"name":"Sadio Mane", odd:"8.50"}, {"name":"Christian Eriksen", odd:"9.00"}, {"name":"Danny Ings", odd:"9.00"}, {"name":"Philippe Coutinho", odd:"9.00"}, {"name":"Adam Lallana", odd:"11.00"}, {"name":"Joshua Onomah", odd:"11.00"}, {"name":"Marko Grujic", odd:"12.00"}, {"name":"Georginio Wijnaldum", odd:"15.00"}, {"name":"Ryan Mason", odd:"15.00"}, {"name":"Eric Dier", odd:"17.00"}, {"name":"Harry Winks", odd:"17.00"}, {"name":"Jordan Henderson", odd:"17.00"}, {"name":"Tom Carroll", odd:"17.00"}, {"name":"Victor Wanyama", odd:"19.00"}, {"name":"Emre Can", odd:"26.00"}, {"name":"James Milner", odd:"26.00"}, {"name":"Kevin Stewart", odd:"26.00"}, {"name":"Tobias Alderweireld", odd:"26.00"}, {"name":"Jan Vertonghen", odd:"29.00"}, {"name":"Joel Matip", odd:"29.00"}, {"name":"Alberto Moreno", odd:"34.00"}, {"name":"Danny Rose", odd:"34.00"}, {"name":"Dejan Lovren", odd:"34.00"}, {"name":"Kieran Trippier", odd:"34.00"}, {"name":"Kyle Walker", odd:"34.00"}, {"name":"Lucas Leiva", odd:"34.00"}, {"name":"Nathaniel Clyne", odd:"34.00"}, {"name":"Trent Alexander-Arnold", odd:"34.00"}, {"name":"Ben Davies", odd:"41.00"}, {"name":"Kevin Wimmer", odd:"41.00"}, {"name":"Ragnar Klavan", odd:"41.00"}, {"name":"Cameron Carter-Vickers", odd:"51.00"}, {"name":"Connor Randall", odd:"51.00"}]})]
    }

    renderOneColumnTable(eventName, bet, i){
        return <OneColumnTable key={i} eventName={eventName} bet={bet} addTip={this.addTip.bind(this)}/>
    }

    /* filters will map the choices to the respective column */
    renderTwoColumnsTable(eventName, bet, i, filters){
        return <TwoColumnsTable key={i} eventName={eventName} bet={bet} filters={filters} addTip={this.addTip.bind(this)}/>
    }

    renderThreeColumnsTable(eventName, bet, i, filters){
        return <ThreeColumnsTable key={i} eventName="Benfica - Sporting" bet={bet} filters={filters} addTip={this.addTip.bind(this)}/>
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

        let Tables = []
        if (this.props.fetched){
            ({Tables, sport, league, match}  = this.renderTables(data,sportCode, leagueCode, matchCode))
        }
        let Loading = []
        if (this.props.fetching) {
            Loading =(   <div class="cssload-container">
                            <div class="cssload-whirlpool"></div>
                        </div>)
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
