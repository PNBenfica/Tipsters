import React from "react";
import { connect } from "react-redux";

import { fetchTables } from "../actions/sportsActions";

import BetSlip from "../components/sports/betslip/BetSlip";
import Breadcrumb from "../components/sports/Breadcrumb";
import EventURL from "../components/sports/EventURL";
import GoalsScorersTable from "../components/sports/tables/GoalsScorersTable";
import ColumnsTable from "../components/sports/tables/ColumnsTable";
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

    /*
        * @desc fetch tables from the server based on the url params
    */
    fetchTables(sportParams){
        if (typeof sportParams.sportCode === 'undefined')
            sportParams = {sportCode: '1'}
        this.props.dispatch(fetchTables(sportParams))
    }
    
    componentWillMount() {
        this.fetchTables(this.props.params)
    }

    /*
        * @desc when the url params change (sport, league or match code) the tables must be updated
    */
    componentWillReceiveProps(nextProps) {
        const {sportCode, leagueCode, matchCode} = nextProps.params
        const urlParamsChanged = (sportCode !== this.props.params.sportCode || leagueCode !== this.props.params.leagueCode  || matchCode !== this.props.params.matchCode)

        if (urlParamsChanged){
            this.fetchTables(nextProps.params)
        }
    }

    /*
        * @desc must redefine this method since the componentWillReceiveProps will cause a rerender of the page before the new tables are fetched
        *       this will cause a bug because the tables will be rendered with the new url params, but the old tables data (during a fraction of seconds)
    */
    shouldComponentUpdate(nextProps, nextState){
        const {sportCode, leagueCode, matchCode} = nextProps.params;
        const urlParamsChanged = (sportCode !== this.props.params.sportCode || leagueCode !== this.props.params.leagueCode  || matchCode !== this.props.params.matchCode)
        
        if (urlParamsChanged)
            return nextProps.fetching != this.props.fetching
        return true
    }

    /***** <Bet Slip> *****/

    /*
        * @desc updates the selling price of th betslip
        * @param the new selling price
    */
    updateSellingPrice(sellingPrice){
        this.setState({ betSlip: { ...this.state.betSlip, sellingPrice: sellingPrice } })
    }

    getBetSlipTips(){
        return this.state.betSlip.tips
    }

    getBetSlipTip(eventURL, bet, choice){
        return this.getBetSlipTips().find((tip) => tip.bet.id==bet.id && tip.choice.id==choice.id && (tip.eventURL.renderPath() == eventURL.renderPath()))
    }

    /*
        * @return array of all url paths of the events present in the bet slip
    */
    getBetSlipEventsURL(){
        return this.getBetSlipTips().map((tip) => tip.eventURL.renderPath())
    }

    /*
        * @return true if this choice is in the bet slip
    */
    isInBetSlip(eventURL, bet, choice){
        return typeof this.getBetSlipTip(eventURL, bet, choice) !== 'undefined'
    }

    /*
        * @return true if a tip on the event is already on the bet slip
    */
    alreadyTipOnEvent(eventURL){
		return this.getBetSlipEventsURL().includes(eventURL.renderPath())
    }


    /*
        * @desc a betslip can only have 14 tips
    */
    isBetSlipFull(){
        return this.getBetSlipTips().length === 14
    }

    addTip(eventURL, bet, choice){
        if (this.isInBetSlip(eventURL, bet, choice))
            this.removeTip(eventURL, bet, choice)
        else if (!this.isBetSlipFull() && !this.alreadyTipOnEvent(eventURL)){
            const Tip = { eventURL, bet: { name: bet.name , id: bet.id }, choice }
            this.state.betSlip.tips = [ ...this.state.betSlip.tips, Tip];
            this.setState({betSlip: this.state.betSlip});
        }
    }

    removeTip(eventURL, bet, choice){
        this.state.betSlip.tips = this.state.betSlip.tips.filter(tip => !(tip.bet.id==bet.id && tip.choice.id==choice.id && (tip.eventURL.renderPath() == eventURL.renderPath())));
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
        if (sport.name == "Football")
            return this.renderFootball(sport, eventURL)
        return this.renderGenericTable("Leagues", sport.events, eventURL)
    }


    /* 
        * @desc renders the football page, it must first separate the leagues (main leagues - [premier league, la liga, ...])
        * @param json 'sport' - sport data fetched from the server 
        * @param EventURL 'eventURL' - contains the url params, used to build events href
        * @return sports tables
     */
    renderFootball(sport, eventURL){
        const mainLeaguesNames = ["Eng. Premier League", "Portuguese Prim. Liga", "German Bundesliga", "Italian Serie A", "French League 1", "Spanish Liga Primera"]
        const uefaLeaguesNames = ["Champions League", "Europa League"]

        const mainLeagues = {name:"Main Leagues", events: sport.events.filter(event => mainLeaguesNames.includes(event.name))}
        const uefaLeagues = {name:"Uefa", events: sport.events.filter(event => uefaLeaguesNames.includes(event.name))}
        const allLeagues = {name:"All Leagues", events: sport.events}
        return [mainLeagues, uefaLeagues, allLeagues].
                                                filter(category => category.events.length > 0).
                                                map(({name, events}, i) => this.renderGenericTable(name, events, eventURL, i))
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
        const specialBets = ["Relegation", "Place 1-4", "Outright Winner", "Winner", "Winning Team", "Place 1-2", "Drivers Championship Winner", "Constructors Championship"]
        return hasOneMatch && specialBets.includes(matches[0].bets[0].name)
    }

    /* 
        * @desc renders a league bet table (each league may have league bets (ex: League Winner, etc))
                renders a table that will have only for example, a header and league bet options ["Relegation", "Place 1-4", "Outright Winner"]
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
        return <MatchesTable key={i} eventURL={eventURL} date={day} matches={matches} addTip={this.addTip.bind(this)} isInBetSlip={this.isInBetSlip.bind(this)} />
    }


    /* 
        * @desc renders a table for each bet of the macth (maps each bet name to the corresponding table)
        * @param json 'match' - match data fetched from the server 
        * @param EventURL 'eventURL' - contains the url params, used to build events href
        * @return match tables
     */
    renderMatch(match, eventURL){
        const tablesMap = {"Match Result": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Half-Time Result": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Total Goals": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Number of Goals": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Double Chance": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "First Team To Score": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Half-Time / Full-Time": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Handicap" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i), "Correct Score" : (eventURL, bet, i) => this.renderCorrectScore(eventURL, bet, i), "Half-Time Correct Score" : (eventURL, bet, i) => this.renderCorrectScore(eventURL, bet, i), "Goalscorers" : (eventURL, bet, i) => this.renderGoalscorers(eventURL, bet.bets, i), "Outright Winner" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i, true), "Place 1-4" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i, true), "Relegation" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i, true), "Over/Under" : (eventURL, bet, i) => this.renderColumnsTable(eventURL, bet, 2, i, [(choice => choice.name.includes("Over")), (choice => choice.name.includes("Under"))]), "Total Points" : (eventURL, bet, i) => this.renderColumnsTable(eventURL, bet, 2, i) ,"Total Sets" : (eventURL, bet, i) => this.renderColumnsTable(eventURL, bet, 2, i), "Total Games" : (eventURL, bet, i) => this.renderColumnsTable(eventURL, bet, 2, i), "Match Winner" : (eventURL, bet, i) => this.renderColumnsTable(eventURL, bet, 2, i), "Drivers Championship Winner" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i, true), "Constructors Championship" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i, true), "Winner" : (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i, true), "Winning Team": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i, true), "Place 1-2": (eventURL, bet, i) => this.renderStandardOptionsTable(eventURL, bet, i, true),}
        
        if (this.hasGoalscorerBets(match)){
            this.reformGoalscorerBets(match)
        }
        this.sortMatchBets(match)

        return match.bets.map((bet,i) => tablesMap[bet.name](eventURL, bet, i))
    }

    /* 
        * @desc sorts the bets accordingly to their name
        * @param json 'match' - match data fetched from the server 
        * @return match tables
     */
    sortMatchBets(match){
        const betNamesOrdered = ["Match Result", "Double Chance", "Over/Under", "Total Goals", "Number of Goals", "First Team To Score", "Half-Time Result", "Half-Time / Full-Time", "Handicap", "Correct Score", "Half-Time Correct Score", "Goalscorers", "Match Winner", "Outright Winner", "Place 1-4", "Relegation", "Total Sets", "Total Games", "Winner", "Drivers Championship Winner", "Constructors Championship"]
        // match.bets.sort((a, b) => a.name.localeCompare(b.name))
        match.bets.sort((a, b) => betNamesOrdered.indexOf(a.name) - betNamesOrdered.indexOf(b.name))
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
    }

    
    renderGenericTable(title, events, eventURL, i=0, sortFunc = (a,b)=>a.name.localeCompare(b.name) ){
        return <SportTable key={i} title={title} events={events.sort(sortFunc)} eventURL={eventURL}/>
    }
    
    renderStandardOptionsTable(eventURL, bet, i, toSort = false){
        if (toSort)
            bet.choices = bet.choices.sort((choice1, choice2) => choice1.odd - choice2.odd)
        return <StandardOptionsTable key={i} eventURL={eventURL} bet={bet} addTip={this.addTip.bind(this)} isInBetSlip={this.isInBetSlip.bind(this)}/>
    }

    /* filters will map the choices to the respective column */
    renderColumnsTable(eventURL, bet, nCols, i, filters=[]){
        return <ColumnsTable key={i} eventURL={eventURL} bet={bet} nCols={nCols} filters={filters} addTip={this.addTip.bind(this)} isInBetSlip={this.isInBetSlip.bind(this)}/>
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
        return this.renderColumnsTable(eventName, bet, 3, i, filters)
    }
    
    renderGoalscorers(eventURL, bets, i){
        return <GoalsScorersTable key={i} eventURL={eventURL} bets={bets} addTip={this.addTip.bind(this)} isInBetSlip={this.isInBetSlip.bind(this)}/>
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
