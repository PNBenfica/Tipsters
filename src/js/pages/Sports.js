import React from "react";
import { connect } from "react-redux";

import { fetchTables } from "../actions/sportsActions";

import BetSlip from "../components/sports/betslip/BetSlip";
import Breadcrumb from "../components/sports/Breadcrumb";
import FootballMatchesTable from "../components/sports/FootballMatchesTable";
import SportTable from "../components/sports/SportTable";
import TipsOnThisEvent from "../components/sports/chatpanel/TipsOnThisEvent";

@connect((store) => {
  return {
    tables: store.sports.tables,
  };
})
export default class Sports extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = { betSlip : { tips: [], sellingPrice : 0 }};
    }
    
    componentWillMount() {
        this.props.dispatch(fetchTables('football', this.props.params.league))
    }

    componentWillReceiveProps(nextProps) {
        const {sport, league, match} = nextProps.params;

        if (league !== this.props.params.league){
            this.props.dispatch(fetchTables('football', league));
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

  	
  	render() {

	  	let {sport, league, match} = this.props.params;

	    if (typeof sport === "undefined")
	    	sport = "Football";


	    let data = this.props.tables;

	  	const Tables = data.map((table, i) =>{
	  		if (table.type === "FootballMatchesList")
	  			return <FootballMatchesTable key={i} date={table.date} matches={table.matches} addTip={this.addTip.bind(this)}/>;
	  		else
	  			return <SportTable key={i} title={table.title} options={table.options}/>
	  	});

	    return (

	        <div class="row">

	            <div class="league-tables col-lg-8 sports-table-container">
	                
	                <Breadcrumb sport={sport} league={league} match={match}/>	                

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
