import React from "react";
import { connect } from "react-redux";

import { fetchTables } from "../actions/sportsActions";

import BetSlip from "../components/sports/betslip/BetSlip";
import Breadcrumb from "../components/sports/Breadcrumb";
import MatchesTable from "../components/sports/MatchesTable";
import SportTable from "../components/sports/SportTable";
import TipsOnThisEvent from "../components/sports/chatpanel/TipsOnThisEvent";

@connect((store) => {
  return {
    tables: store.sports.tables,
    fetched: store.sports.fetched,
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

        if (sportCode !== this.props.params.sportCode || leagueCode !== this.props.params.leagueCode){
            this.props.dispatch(fetchTables({sportCode, leagueCode, matchCode}));
        }
        // if (nextProps.sport !== this.props.fullName) {
        // loadData(nextProps);
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
    renderTables(data){        
        let response = {"sport" : data.name}
        if (data.events.length === 1) {
            response.league = data.events[0].name

            if (typeof data.events.matches !== 'undefined' && data.events.matches.length === 1){
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

    renderSport(sport){
        return this.renderGenericTable("Leagues", sport.events,  sport.name + "/" + sport.id)
    }

    renderGenericTable(title, events, ref, i=0){
        return <SportTable key={i} title={title} events={events.sort((a, b) => a.name.localeCompare(b.name))} baseRef={ref}/>
    }

    renderLeague(data){
        const sportRef = data.name + '/' + data.id
        const league = data.events[0]
        let days = league.matches.map((match) => match.start_date.split("T")[0]) // get all the day of the events
        days = [ ...new Set(days) ]; // remove duplicates
        return days.map((day, i) => {
            const matches = league.matches.filter(match =>match.start_date.split("T")[0] === day )
            const isSpecialBets = (matches.length === 1) && (["Relegation", "Place 1-4", "Outright Winner"].includes(matches[0].bets[0].name))
            if (isSpecialBets)
                return this.renderGenericTable("League bets", matches[0].bets, sportRef + "/" + league.name + "/" + league.id, i)
            else
                return <MatchesTable key={i} sportRef={sportRef} date={day} matches={matches} addTip={this.addTip.bind(this)}/>})

    }
  	
  	render() {

	  	let {sport = "Football", sportCode = "1", league, leagueCode, match, matchCode}  = this.props.params;

	    let data = this.props.tables;

        let Tables = []
        if (this.props.fetched){
            ({Tables, sport, league, match}  = this.renderTables(data))
        }

	  	// const Tables = data.events.map((table, i) =>{
	  	// 	if (table.type === "FootballMatchesList")
	  	// 		return <MatchesTable key={i} date={table.date} matches={table.matches} addTip={this.addTip.bind(this)}/>;
	  	// 	else
	  	// 		return <SportTable key={i} title="Leagues" options={table.options}/>
	  	// });

	    return (

	        <div class="row">

	            <div class="league-tables col-lg-8 sports-table-container">
	                
	                <Breadcrumb sport={sport} sportCode={sportCode} league={league} leagueCode={leagueCode} match={match} matchCode={matchCode}/>	                

	                {Tables}

	            </div>


	            <div class="col-lg-4 hidden-md hidden-sm hidden-xs right-sports-bar-container">

	            	<BetSlip {...this.state.betSlip} updateSellingPrice={this.updateSellingPrice.bind(this)} removeTip={this.removeTip.bind(this)}/>

	                <TipsOnThisEvent />

	            </div>
	        </div>
	    );
  	}
}
