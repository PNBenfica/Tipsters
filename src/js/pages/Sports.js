import React from "react";
import { connect } from "react-redux"

import { fetchTables, fetchTips, shareTip } from "../actions/sportsActions"

import classNames from "classnames"

import LeaguePanel from "../components/home/shareatip/LeaguePanel"
import BetSlip from "../components/sports/betslip/BetSlip"
import Breadcrumb from "../components/sports/Breadcrumb"
import EventURL from "../components/sports/EventURL"
import GoalsScorersTable from "../components/sports/tables/GoalsScorersTable"
import ColumnsTable from "../components/sports/tables/ColumnsTable"
import LoadingGif from "../components/LoadingGif"
import MatchesTable from "../components/sports/tables/MatchesTable"
import Page from "./Page"
import Section from "../components/Section"
import SportsList from "../components/sports/SportsList"
import SportTable from "../components/sports/tables/SportTable"
import StandardOptionsTable from "../components/sports/tables/StandardOptionsTable"
import TipsOnThisEvent from "../components/sports/tipsOnThisEvent/TipsOnThisEvent"
import WarningAlreadyInBetSlip from "../components/sports/betslip/WarningAlreadyInBetSlip"

@connect((store) => {
  return {
    tables: store.sports.tables,
    fetched: store.sports.fetched,
    fetching: store.sports.fetching,
    tips: store.sportsTips.tips,
    fetchingTips: store.sportsTips.fetching,
    fetchedTips: store.sportsTips.fetched,
  };
})
export default class Sports extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = { betSlip : { tips: [], sellingPrice : 0, comment: "", expanded : false }, warningAlreadyInBetSlip : false};
    }

    /*
        * @desc fetch tables from the server based on the url params
    */
    fetchTables(sportParams){
        if (typeof sportParams.sportCode === 'undefined')
            sportParams = {sportCode: '1'}
        this.props.dispatch(fetchTables(sportParams))
        this.props.dispatch(fetchTips(sportParams))
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

            let target
            if (typeof matchCode !== "undefined"){
                target = this.refs.match
            }
            else if (typeof leagueCode !== "undefined"){
                target = this.refs.matches
            }
            else if (typeof sportCode !== "undefined"){
                target = this.refs.leagues
            }
            else{
                target = this.refs.sports
            }

            $("html, body").stop().animate({scrollTop:target.getBoundingClientRect().top + document.body.scrollTop - 100}, 750);

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
        return this.numberBetSlipTips() === 14
    }

    isBetSlipEmpty(){
        return this.numberBetSlipTips() === 0
    }

    numberBetSlipTips(){
        return this.getBetSlipTips().length
    }

    onOddClick(eventURL, bet, choice){
        if (this.isInBetSlip(eventURL, bet, choice))
            this.removeTip(eventURL, bet, choice)
        else if (this.alreadyTipOnEvent(eventURL))
            this.showWarningAlreadyInBetSlip()
        else if (!this.isBetSlipFull())
            this.addTip(eventURL, bet, choice)
    }

    addTip(eventURL, bet, choice){
        if (this.isBetSlipEmpty())
            setTimeout(() => {this.state.betSlip.expanded = true; this.setState({betSlip: this.state.betSlip}) }, 300)

        const Tip = { eventURL, bet: { name: bet.name , id: bet.id }, choice, animating: true, expanded: false }
        this.state.betSlip.tips = [ ...this.state.betSlip.tips, Tip];
        this.setState({betSlip: this.state.betSlip}, () => this.transitionBetSlipTip(eventURL, bet, choice));
    }


    removeTip(eventURL, bet, choice){
        if (this.numberBetSlipTips() === 1){
            this.state.betSlip.expanded = false
            this.setState({betSlip: this.state.betSlip})
        }

        this.transitionBetSlipTip(eventURL, bet, choice,
            () => {
                this.state.betSlip.tips = this.state.betSlip.tips.filter(tip => !(tip.bet.id==bet.id && tip.choice.id==choice.id && (tip.eventURL.renderPath() == eventURL.renderPath())));
                this.setState({betSlip: this.state.betSlip})
            })
    }

    transitionBetSlipTip(eventURL, bet, choice, callback){
        const tips = this.getBetSlipTips()
        const tipIndex = tips.findIndex(tip => tip.eventURL.renderPath() == eventURL.renderPath())
        tips[tipIndex].expanded = !tips[tipIndex].expanded
        tips[tipIndex].animating = true

        setTimeout(
            () => this.setState({betSlip: this.state.betSlip}, () => {
                setTimeout( () => {
                tips[tipIndex].animating = false
                this.setState({betSlip: this.state.betSlip}, callback)} , 800 )               
            }
        ),25);
    }

    showWarningAlreadyInBetSlip(){
        this.setState({ warningAlreadyInBetSlip : true })
    }

    hideWarningAlreadyInBetSlip(){
        this.setState({ warningAlreadyInBetSlip : false })
    }

    setBetSlipComment(comment){
        let { betSlip } = this.state
        betSlip.comment = comment
        this.setState({ betSlip })
    }

    shareTip(){
        const betSlip = {...this.state.betSlip}
        const shareTipRequest = () => this.props.dispatch(shareTip(betSlip))
        this.resetBetSlip(shareTipRequest)
    }

    resetBetSlip(callback){
        this.setState( { betSlip : { tips: [], sellingPrice : 0, comment: "", expanded : false } }, callback )
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

        return [
                this.renderMainLeagues(sport.name),
                <Section key={2} title="All leagues" classes="sports-page-tables">
                    {this.renderGenericTable("All Leagues", sport.events, eventURL)}
                </Section>
                ]
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
        return <div class="sports-page-tables">{[mainLeagues, uefaLeagues, allLeagues].
                                                filter(category => category.events.length > 0).
                                                map(({name, events}, i) => this.renderGenericTable(name, events, eventURL, i))}</div>
    }


    renderMainLeagues(sportName){

        let mainLeagues = this.getMainLeagues(sportName)

        return (
            <Section key={1} title="Main leagues" classes="main-leagues">
                {mainLeagues.map((league,i) => this.renderMainLeague(league,i))}
            </Section>
        )
    }

    getMainLeagues(sportName){
        let mainLeagues = {
            "Football": [{name:"Premier League", url:"#/sports/Football/1/Eng. Premier League/3", img:"img/home/ibra.jpg"},{name:"Bundesliga", url:"#/sports/Football/1/German Bundesliga/5/", img:"img/home/deus_nato.jpg"},{name:"La Liga", url:"#/sports/Football/1/Spanish Liga Primera/7", img:"img/home/messi_neymar.jpg"},{name:"Liga Nos", url:"#/sports/Football/1/Portuguese Prim. Liga/32", img:"img/home/pizzi_cervi.jpg"},{name:"Serie A", url:"#/sports/Football/1/Italian Serie A/6", img:"img/home/deus_joao.jpg"},{name:"Ligue 1", url:"#/sports/Football/1/French Ligue 1/4", img:"img/home/bernardo_silva.jpg"},{name:"Champions League", url:"#/sports/Football/1/Champions League/8", img:"img/home/champions_league.jpg"},{name:"Europa League", url:"#/sports/Football/1/Europa League/3453", img:"img/home/europa_league.jpg"}],
            "Basketball": [{name:"NBA", url:"#/sports/Basketball/4/NBA/13", img:"img/home/nba.jpg"},],
            "Tennis": [{name:"Australian Open", url:"#/sports/Tennis/2/Australian Open M./22", img:"img/home/federer.jpg"}]
        }

        return mainLeagues[sportName]
    }

    renderMainLeague(league, i){
        return <div key={i} class="col-xs-4"><LeaguePanel {...league}/></div>
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
        return <MatchesTable key={i} eventURL={eventURL} date={day} matches={matches} addTip={this.onOddClick.bind(this)} isInBetSlip={this.isInBetSlip.bind(this)} />
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
        return <StandardOptionsTable key={i} eventURL={eventURL} bet={bet} addTip={this.onOddClick.bind(this)} isInBetSlip={this.isInBetSlip.bind(this)}/>
    }

    /* filters will map the choices to the respective column */
    renderColumnsTable(eventURL, bet, nCols, i, filters=[]){
        return <ColumnsTable key={i} eventURL={eventURL} bet={bet} nCols={nCols} filters={filters} addTip={this.onOddClick.bind(this)} isInBetSlip={this.isInBetSlip.bind(this)}/>
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
        return <GoalsScorersTable key={i} eventURL={eventURL} bets={bets} addTip={this.onOddClick.bind(this)} isInBetSlip={this.isInBetSlip.bind(this)}/>
    }

  	render() {
                // {

                // <Breadcrumb sport={sport} sportCode={sportCode} league={league} leagueCode={leagueCode} match={match} matchCode={matchCode}/>                   
                    // <div class="col-lg-4 hidden-md hidden-sm hidden-xs right-bar-container">

                //     <BetSlip {...this.state.betSlip} updateSellingPrice={this.updateSellingPrice.bind(this)} removeTip={this.removeTip.bind(this)} shareTip={this.shareTip.bind(this)} setBetSlipComment={this.setBetSlipComment.bind(this)}/>

                //     <TipsOnThisEvent tips={tips} fetching={fetchingTips} fetched={fetchedTips} />

                // </div>}

        let {sport = "Football", sportCode, league, leagueCode, match, matchCode}  = this.props.params
	  	let { tips, fetchingTips, fetchedTips }  = this.props

        const loading = this.props.fetching || !this.props.fetched

        let Tables = []
        if (!loading) {
            // const data = this.props.tables;
            // Tables  = this.renderTables(data);
            // ({ sport, league, match }  = this.getSportUrlParams(data))
        }

	    return (

            <Page id="sports-page" title="Share a tip" loading={false} img="img/covers/shareatip.jpg" >


                <div class="col-xs-12 col-md-8 col-md-push-2 sports-tables-container">

                    <div class="col-xs-12 sports active" ref="sports">
                        <SportsList activeSportCode={sportCode}/>
                    </div>

                    <div class={classNames("col-xs-12 leagues", {active: typeof sportCode !== 'undefined'} )} ref="leagues">
                        <a href="#/sports/Football/1/Eng. Premier League/3">Leagues</a>
                    </div>

                    <div class={classNames("col-xs-12 matches", {active: typeof leagueCode !== 'undefined'} )} ref="matches">
                        <a href="#/sports/Football/1/Eng. Premier League/3/Manchester United - Arsenal/1267076/">Matches</a>
                    </div>

                    <div class={classNames("col-xs-12 macth", {active: typeof matchCode !== 'undefined'} )} ref="match">
                        <a href="#/sports/Football/1">Match</a>
                    </div>

	            </div>

                <WarningAlreadyInBetSlip active={this.state.warningAlreadyInBetSlip} dismiss={this.hideWarningAlreadyInBetSlip.bind(this)}/>

	        </Page>
	    )



  	}
}

