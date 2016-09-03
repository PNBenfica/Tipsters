import React from "react";
import { connect } from "react-redux";

import { fetchTables } from "../actions/sportsActions";

import BetSlip from "../components/sports/betslip/BetSlip";
import Breadcrumb from "../components/sports/Breadcrumb";
import EventURL from "../components/sports/EventURL";
import GoalsScorersTable from "../components/sports/tables/GoalsScorersTable";
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

    shouldComponentUpdate(nextProps, nextState){
        const {sportCode, leagueCode, matchCode} = nextProps.params;
        
        if (sportCode !== this.props.params.sportCode || leagueCode !== this.props.params.leagueCode  || matchCode !== this.props.params.matchCode)
            return nextProps.fetching != this.props.fetching
        return true
    }

    /***** <Bet Slip> *****/

    updateSellingPrice(sellingPrice){
        this.setState({sellingPrice});
    }

    alreadyTipOnEvent(eventURL){
    	let eventsList = this.state.betSlip.tips.map((tip) => tip.eventURL.renderPath());
		return eventsList.indexOf(eventURL.renderPath()) !== -1;
    }

    addTip(eventURL, bet, choice){
        if (this.state.betSlip.tips.length < 14 && !this.alreadyTipOnEvent(eventURL)){
            const Tip = { eventURL, bet: { name: bet.name , id: bet.id }, choice }
            this.state.betSlip.tips = [ ...this.state.betSlip.tips, Tip];
            this.setState({betSlip: this.state.betSlip});
        }
    }

    removeTip(index){
        this.state.betSlip.tips = this.state.betSlip.tips.filter((_, i) => i !== index);
        this.setState({
            betSlip: this.state.betSlip
        });
    }

    shareTip(){
        console.log(this.state.betSlip)
    }

    /***** </ Bet Slip> *****/


    /* 
        * @desc returns true if is rendering a sport (ex: football)
        * @return bool
     */
    isRenderingSport(){
        return !this.isRenderingLeague() && !this.isRenderingMatch()
    }

    /* 
        * @desc returns true if is rendering a league (ex: premier league)
        *       checks the url params
        * @return bool
     */
    isRenderingLeague(){
        const { leagueCode } = this.props.params; 
        return (typeof leagueCode !== 'undefined') && !this.isRenderingMatch()
    }

    /* 
        * @desc returns true if is rendering a match (ex: Tottenham vs Liverpool)
        *       checks the url params
        * @return bool
     */
    isRenderingMatch(){
        const { matchCode } = this.props.params; 
        return (typeof matchCode !== 'undefined')
    }

    /* 
        * @desc returns the name of the sport, league and match names of the current page
        *   as well as the corresponding name (fetched from the server)
        * @param json 'data' - current sport data fetched from the server 
        * @return json - sport, league and match names
     */
    getSportUrlParams(data){        
        let params = {"sport" : data.name}
        if (!this.isRenderingSport()) {
            const league = data.events[0]
            params.league = league.name
            
            if (this.isRenderingMatch()) {
                const match = league.matches[0]
                params.match = match.name
            }
        }
        return params
    }

    /* 
        * @desc determines which category is being rendered (sport, league ou match) and renders its tables
        * @param json 'data' - current sport data fetched from the server 
        * @return tables
     */
    renderTables(data){        
        if (this.isRenderingSport()) {
            return this.renderSport(data, new EventURL(data))
        }
        else {
            const league = data.events[0]
            if (this.isRenderingLeague()) {
                return this.renderLeague(league, new EventURL(data, league))
            }
            else{                    
                const match = league.matches[0]
                return this.renderMatch(match, new EventURL(data, league, match))
            }
        }
    }

    /* 
        * @desc renders the current sport tables
        * @param json 'sport' - sport data fetched from the server 
        * @param EventURL 'eventURL' - contains the url params, used to build events href
        * @return sports tables
     */
    renderSport(sport, eventURL){
        return this.renderGenericTable("Leagues", sport.events, eventURL)
    }

    /* 
        * @desc renders a table for each day, with the events that will occur on that day
        * @param json 'league' - league data fetched from the server 
        * @param EventURL 'eventURL' - contains the url params, used to build events href
        * @return league tables
     */
    renderLeague(league, eventURL){
        const days = this.getLeagueDays(league)
        return days.map((day, i) => this.renderLeagueTable(league, day, eventURL, i))
    }


    /* 
        * @desc returns the list of all unique days in which will occur events of the league
        * @param json 'league' - league data fetched from the server 
        * @return array of days
     */
    getLeagueDays(league){
        let days = league.matches.map(match => this.getMatchDay(match))
        return [ ...new Set(days) ]; // remove duplicates
    }

    /* 
        * @desc returns the the day of a match
        * @param json 'match' - match data fetched from the server 
        * @return day of the match
     */
    getMatchDay(match){
        return match.start_date.split("T")[0] // ("2016-08-27T10:10" => "2016-08-27")
    }

    /* 
        * @desc renders a league table of a specific day
                    specials bets must be treated differently (ex: normally the day would be the table header title, would not have any odss, etc...)
        * @param json 'league' - league data fetched from the server 
        * @param string 'day' - day 
        * @param EventURL 'eventURL' - contains the url params, used to build events href
        * @return league table
     */
    renderLeagueTable(league, day, eventURL, i){
        const matches = league.matches.filter(match => this.getMatchDay(match) == day)
        if (this.isLeagueBet(matches))
            return this.renderLeagueBetsTable(matches[0], eventURL, i)
        else
            return this.renderMatchesTable(eventURL, day, matches, i)
    }

    /* 
        * @desc returns true if this match correspond to the league bets 
                (each league may have league bets (ex: League Winner, etc)) 
        * @param json 'matches' - matches os the league 
        * @return bool
     */
    isLeagueBet(matches){
        const hasOneMatch = (matches.length === 1) 
        const specialBets = ["Relegation", "Place 1-4", "Outright Winner", "Winner", "Drivers Championship Winner", "Constructors Championship"]
        return hasOneMatch && specialBets.includes(matches[0].bets[0].name)
    }

    /* 
        * @desc renders a table that will have only for example, a header and league bet options ["Relegation", "Place 1-4", "Outright Winner"]
                the id of each option is changed to the match id so that when selected it shows all the league bets and not only the selected
                should I do this?
        * @param json 'match' - match that contains the league bets 
        * @param EventURL 'eventURL' - contains the url params, used to build events href
        * @return table
     */
    renderLeagueBetsTable(match, eventURL, i){
        match.bets.forEach(bet => bet.id = match.id)
        return this.renderGenericTable("League bets", match.bets, eventURL, i)
    }

    /* 
        * @desc renders a table with rows like: match---|odd|odd|odd
        * @param string 'day' - the day will be the header of the table 
        * @param json 'matches' - the matches that will be displayed in the table 
        * @param EventURL 'eventURL' - contains the url params, used to build events href
        * @return table
     */
    renderMatchesTable(eventURL, day, matches, i){
        return <MatchesTable key={i} eventURL={eventURL} date={day} matches={matches} addTip={this.addTip.bind(this)}/>
    }


    /* 
        * @desc renders a table for each bet of the macth (maps each bet name to the corresponding table)
        * @param json 'match' - match data fetched from the server 
        * @param EventURL 'eventURL' - contains the url params, used to build events href
        * @return match tables
     */
    renderMatch(match, eventURL){
        const tablesMap = {"Match Result": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Half-Time Result": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Total Goals": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Number of Goals": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Double Chance": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "First Team To Score": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Half-Time / Full-Time": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Handicap" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Correct Score" : (eventURL, bet, i) => this.renderCorrectScore(eventURL, bet, i), "Half-Time Correct Score" : (eventURL, bet, i) => this.renderCorrectScore(eventURL, bet, i), "Goalscorers" : (eventURL, bet, i) => this.renderGoalscorers(eventURL, bet.bets, i), "Outright Winner" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Place 1-4" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Relegation" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Over/Under" : (eventURL, bet, i) => this.renderTwoColumnsTable(eventURL, bet, i, [(choice => choice.name.includes("Over")), (choice => choice.name.includes("Under"))]), "Total Sets" : (eventURL, bet, i) => this.renderTwoColumnsTable(eventURL, bet, i), "Total Games" : (eventURL, bet, i) => this.renderTwoColumnsTable(eventURL, bet, i), "Match Winner" : (eventURL, bet, i) => this.renderTwoColumnsTable(eventURL, bet, i), "Drivers Championship Winner" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Constructors Championship" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Winner" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i),}

        if (this.hasGoalscorerBets(match)){
            this.reformGoalscorerBets(match)
        }
        return match.bets.map((bet,i) => tablesMap[bet.name](eventURL, bet, i))
    }

    /* 
        * @desc returns true if this macth has bets on goalscorers
        * @param json 'match' - match data fetched from the server 
        * @return bool
     */
    hasGoalscorerBets(match){
        return this.getGoalscorerBets(match).length > 0
    }

    /* 
        * @desc returns the bets on goalscorers of this match
        * @param json 'match' - match data fetched from the server 
        * @return array of bets (maybe null)
     */
    getGoalscorerBets(match){
        const betsNames = ["Goalscorer", "First Goalscorer", "Last Goalscorer"]
        return match.bets.filter(bet => betsNames.includes(bet.name))
    }

    /* 
        * @desc the goalscorers bets come in 3 separated bets, they must be joined so that they are sent to the same table
        * @param json 'match' - match data fetched from the server 
        * @return bool
     */
    reformGoalscorerBets(match){
        const goalscorersBets = this.getGoalscorerBets(match)
        const joinedBets = {name: "Goalscorers", bets: goalscorersBets}
        match.bets = match.bets.filter(bet => !goalscorersBets.includes(bet))
        match.bets.push(joinedBets)
        console.log(match.bets)
    }

    
    renderGenericTable(title, events, eventURL, i=0){
        return <SportTable key={i} title={title} events={events.sort((a, b) => a.name.localeCompare(b.name))} eventURL={eventURL}/>
    }
    
    renderStandardOptionsTable(eventURL, bet, i){
        return <StandardOptionsTable key={i} eventURL={eventURL} bet={bet} addTip={this.addTip.bind(this)}/>
    }

    /* filters will map the choices to the respective column */
    renderTwoColumnsTable(eventURL, bet, i, filters=[]){
        return <TwoColumnsTable key={i} eventURL={eventURL} bet={bet} filters={filters} addTip={this.addTip.bind(this)}/>
    }

    renderThreeColumnsTable(eventURL, bet, i, filters){
        return <ThreeColumnsTable key={i} eventURL={eventURL} bet={bet} filters={filters} addTip={this.addTip.bind(this)}/>
    }


    /* 
        * @param string 'score' - "1 - 0" 
        * @return array [1, 0]
     */
    parseScore(score){
        return score.replace(/ /g,'').split("-").map(el=>parseInt(el))
    }

    renderCorrectScore(eventName, bet, i){ 
        bet.choices.forEach(choice => choice.result = this.parseScore(choice.name)) /* "1 - 0" => [1,0] */
        const filters = [(choice => choice.result[0] > choice.result[1]), (choice => choice.result[0] == choice.result[1]), (choice => choice.result[0] < choice.result[1])]
        return this.renderThreeColumnsTable(eventName, bet, i, filters)
    }
    
    renderGoalscorers(eventURL, bets, i){
        return <GoalsScorersTable key={i} eventURL={eventURL} bets={bets} addTip={this.addTip.bind(this)}/>
    }

    renderLoadingGif(){
        return (   <div class="cssload-container">
                        <div class="cssload-whirlpool"></div>
                    </div>)
    }

  	render() {

	  	let {sport = "Football", sportCode = "1", league, leagueCode, match, matchCode}  = this.props.params;

        let Tables = []
        if (this.props.fetching) {
            Tables = this.renderLoadingGif()
        }
        else if (this.props.fetched){
            const data = this.props.tables;
            Tables  = this.renderTables(data);
            ({ sport, league, match }  = this.getSportUrlParams(data));
        }

	    return (

	        <div class="row">

	            <div class="league-tables col-lg-8 sports-table-container">
	                
	                <Breadcrumb sport={sport} sportCode={sportCode} league={league} leagueCode={leagueCode} match={match} matchCode={matchCode}/>	                

	                {Tables}
	            </div>


	            <div class="col-lg-4 hidden-md hidden-sm hidden-xs right-sports-bar-container">

	            	<BetSlip {...this.state.betSlip} updateSellingPrice={this.updateSellingPrice.bind(this)} removeTip={this.removeTip.bind(this)} shareTip={this.shareTip.bind(this)}/>

	                <TipsOnThisEvent />

	            </div>
	        </div>
	    );
  	}
}
