import React from "react";
import { connect } from "react-redux"

import { fetchLeagues, fetchMatches, fetchMatch, fetchTips, shareTip } from "../actions/sportsActions"

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
import SquaresList from "../components/sports/SquaresList"
import SportTable from "../components/sports/tables/SportTable"
import SVG from "../components/SVG"
import StandardOptionsTable from "../components/sports/tables/StandardOptionsTable"
import TipsOnThisEvent from "../components/sports/tipsOnThisEvent/TipsOnThisEvent"
import WarningAlreadyInBetSlip from "../components/sports/betslip/WarningAlreadyInBetSlip"

@connect((store) => {
  return {
    leaguesTables: store.sports.leaguesTables,
    fetchingLeagues: store.sports.fetchingLeagues,
    fetchedLeagues: store.sports.fetchedLeagues,
    errorLeagues: store.sports.errorLeagues,

    matchesTables: store.sports.matchesTables,
    fetchingMatches: store.sports.fetchingMatches,
    fetchedMatches: store.sports.fetchedMatches,
    errorMatches: store.sports.errorMatches,

    matchTables: store.sports.matchTables,
    fetchingMatch: store.sports.fetchingMatch,
    fetchedMatch: store.sports.fetchedMatch,
    errorMatch: store.sports.errorMatch,

    tips: store.sportsTips.tips,
    fetchingTips: store.sportsTips.fetching,
    fetchedTips: store.sportsTips.fetched,
  };
})
export default class Sports extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = { betSlip : { tips: [], sellingPrice : 0, comment: "", expanded : false }, warningAlreadyInBetSlip : false, allLeaguesVisible: false};
    }

    /*
        * @desc fetch tables from the server based on the url params
    */
    fetchTables(sportParams, changedParams = { sportChanged : true, leagueChanged : true }){

        const { sportCode, leagueCode, matchCode } = sportParams
        const { sportChanged, leagueChanged } = changedParams

        if (sportCode !== undefined){

            if (sportChanged)
                this.props.dispatch(fetchLeagues(sportParams))

            if (leagueCode !== undefined){

                if (leagueChanged){
                    this.props.dispatch(fetchMatches(sportParams))
                }

                if (matchCode !== undefined){

                    this.props.dispatch(fetchMatch(sportParams))
                }

            }

            this.props.dispatch(fetchTips(sportParams))
            this.setState({ allLeaguesVisible : false })

        }
    }
    
    componentWillMount() {
        this.fetchTables(this.props.params)
        this.scrollToActivePanelOnLoad(this.props.params)
    }

    /*
        * @desc when the url params change (sport, league or match code) the tables must be updated
    */
    componentWillReceiveProps(nextProps) {
        const {sportCode, leagueCode, matchCode, fetchingLeagues, fetchingMatches, fetchingMatch} = nextProps.params

        const sportChanged = sportCode !== this.props.params.sportCode 
        const leagueChanged = leagueCode !== this.props.params.leagueCode 
        const matchChanged = matchCode !== this.props.params.matchCode 
        const urlParamsChanged = (sportChanged || leagueChanged || matchChanged)

        if (urlParamsChanged){

            this.fetchTables(nextProps.params, { sportChanged, leagueChanged } )

            this.scrollToActivePanel(nextProps.params)

        }

        else if( (!fetchingLeagues && this.props.fetchingLeagues) || (!fetchingMatches && this.props.fetchingMatches) || (!fetchingMatch && this.props.fetchingMatch) ){

            this.scrollToActivePanel(nextProps.params)

        }

    }

    scrollToActivePanelOnLoad(sportParams){
        const { fetchingLeagues, fetchingMatches, fetchingMatch } = this.props
        if ( fetchingLeagues || fetchingMatches || fetchingMatch ){

        }
    }

    scrollToActivePanel(sportParams){
        const target = this.activePanel(sportParams)
        this.scrollTo(target)
    }

    scrollTo(target){
        $("html, body").stop().delay(50).animate({scrollTop:target.getBoundingClientRect().top + document.body.scrollTop - 100}, 750);
    }

    activePanel(sportParams){

        const {sportCode, leagueCode, matchCode} = sportParams

        let target
        if (matchCode !== undefined){
            target = this.refs.match
        }
        else if (leagueCode !== undefined){
            target = this.refs.matches
        }
        else if (sportCode !== undefined){
            target = this.refs.leagues
        }
        else{
            target = this.refs.sports
        }

        return target
    }




    scrollToPreviousPanel(){
        const target = this.previousPanel(this.props.params)
        this.scrollTo(target)
    }

    previousPanel(sportParams){

        const isOffScreen = (element) => element.getBoundingClientRect().top < 0
        let target = this.refs.sports
        const refs = [this.refs.sports, this.refs.leagues, this.refs.matches, this.refs.match]

        refs.forEach(ref => { if (isOffScreen(ref)) target = ref } )

        return target
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

    renderMatchOddsTables(){
        const macthLoaded = !this.props.fetchingMatch && this.props.fetchedMatch
        if (macthLoaded){
            const sport = this.props.matchTables
            const league = sport.events[0]
            const match = league.matches[0]
            return this.renderMatch(match, new EventURL(sport, league, match))
        }
        else {
            return <LoadingGif />
        }
    }

    renderLeagueMatchesTable(){
        const macthesLoaded = !this.props.fetchingMatches && this.props.fetchedMatches
        if (macthesLoaded){
            const sport = this.props.matchesTables
            const league = sport.events[0]
            return this.renderLeague(league, new EventURL(sport, league))
        }
        else {
            return <LoadingGif />
        }
    }


    /*
        * @desc renders the main league and all leagues panels
    */
    renderLeaguesTable(){
        const leaguesLoaded = !this.props.fetchingLeagues && this.props.fetchedLeagues
        if (leaguesLoaded){
            const sport = this.props.leaguesTables

            return <div class="col-xs-12">{this.renderMainLeagues(sport.name)} {this.renderAllLeagues(sport)}</div>
        }
        else {
            return <LoadingGif />
        }
    }

    renderAllLeagues(sport){
        if (this.state.allLeaguesVisible){
            return this.renderGenericTable("All Leagues", sport.events, new EventURL(sport))
        }
        else{
            return <a class="show-all-leagues col-xs-12" onClick={() => this.setState({ allLeaguesVisible : true }) } >Show all leagues</a>
        }
    }

    renderMainLeagues(sportName){

        let mainLeagues = this.getMainLeagues(sportName)

        return <SquaresList items={mainLeagues} activeCode={this.props.params.leagueCode} />

    }

    getMainLeagues(sportName){

        let mainLeagues = {
            "Football": [
                { name: "Premier League", code: 3, img: "img/sports/ibra.jpg", url:"#/sports/Football/1/Eng. Premier League/3"},
                { name: "Bundesliga", code: 5, img: "img/sports/deus_nato.jpg", url:"#/sports/Football/1/German Bundesliga/5/"},
                { name: "La Liga", code: 7, img: "img/sports/messi_neymar.jpg", url:"#/sports/Football/1/Spanish Liga Primera/7"},
                { name: "Liga Nos", code: 32, img: "img/sports/pizzi_cervi.jpg", url:"#/sports/Football/1/Portuguese Prim. Liga/32"},
                { name: "Ligue 1", code: 4, img: "img/sports/bernardo_silva.jpg", url:"#/sports/Football/1/French Ligue 1/4"},
                { name: "Serie A", code: 6, img: "img/sports/deus_joao.jpg", url:"#/sports/Football/1/Italian Serie A/6"},
                { name: "Champions League", code: 8, img: "img/sports/champions_league.jpg", url:"#/sports/Football/1/Champions League/"},
                { name: "Europa League", code: 3453, img: "img/sports/europa_league.jpg", url:"#/sports/Football/1/Europa League/"}
            ],
            "Basketball": [
                { name: "NBA", code: 13, img: "img/sports/nba.jpg", url:"#/sports/Basketball/4/NBA/13"},
                { name: "International", code: 14, img: "img/sports/basket2.jpg", url:"#/sports/Basketball/4/NBA/14"},
                { name: "Spain", code: 15, img: "img/sports/basket3.jpg", url:"#/sports/Basketball/4/NBA/15"},
                { name: "France", code: 16, img: "img/sports/basket4.jpg", url:"#/sports/Basketball/4/NBA/16"}
            ],
            "Tennis": [
                { name: "Australian Open", code: 22, img: "img/sports/federer.jpg", url:"#/sports/Tennis/2/Australian Open M./22"},
                { name: "Estoril Open", code: 23, img: "img/sports/djokovic.jpg", url:"#/sports/Tennis/2/Australian Open M./23"},
                { name: "Prostejov", code: 24, img: "img/sports/tsonga.jpg", url:"#/sports/Tennis/2/Australian Open M./24"},
                { name: "Surbiton", code: 25, img: "img/sports/monfils.jpg", url:"#/sports/Tennis/2/Australian Open M./25"}
            ]
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



                // </div>}

        let {sport = "Football", sportCode, league, leagueCode, match, matchCode}  = this.props.params
	  	let { tips, fetchingTips, fetchedTips }  = this.props

        const loading = this.props.fetching || !this.props.fetched

	    return (

            <Page id="sports-page" title="Share a tip" loading={false} img="img/covers/shareatip.jpg" >


                <div class="col-xs-12 sports-tables-container">

                    <div class="col-xs-12 col-md-8 col-md-push-2 sports active" ref="sports">
                        <SportsList activeSportCode={sportCode}/>
                    </div>

                    <div class={classNames("leagues col-xs-12 col-md-10 col-md-push-1", {active: typeof sportCode !== 'undefined'} )} ref="leagues">
                        { this.renderLeaguesTable() }
                    </div>

                    <div class={classNames("matches col-xs-12 col-md-8 col-md-push-2", {active: typeof leagueCode !== 'undefined'} )} ref="matches">
                        { this.renderLeagueMatchesTable() }
                    </div>

                    <div class={classNames("macth col-xs-12 col-md-8 col-md-push-2", {active: typeof matchCode !== 'undefined'} )} ref="match">
                        { this.renderMatchOddsTables() }
                    </div>

	            </div>
                
                <BetSlip {...this.state.betSlip} updateSellingPrice={this.updateSellingPrice.bind(this)} removeTip={this.removeTip.bind(this)} shareTip={this.shareTip.bind(this)} setBetSlipComment={this.setBetSlipComment.bind(this)}/>

                <TipsOnThisEvent tips={tips} fetching={fetchingTips} fetched={fetchedTips} />

                <WarningAlreadyInBetSlip active={this.state.warningAlreadyInBetSlip} dismiss={this.hideWarningAlreadyInBetSlip.bind(this)}/>

                <div class={classNames("go-up-button", {hidden: sportCode === undefined} )} onClick={this.scrollToPreviousPanel.bind(this)}><SVG classes="arrow" icon="edge-button-path" /></div>

	        </Page>
	    )
  	}
}
