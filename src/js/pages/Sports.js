import React from "react";

import BetSlip from "../components/sports/betslip/BetSlip";
import Breadcrumb from "../components/sports/Breadcrumb";
import FootballMatchesTable from "../components/sports/FootballMatchesTable";
import SportTable from "../components/sports/SportTable";
import TipsOnThisEvent from "../components/sports/chatpanel/TipsOnThisEvent";

export default class Sports extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = { betSlip : { tips: [], sellingPrice : 0 }};
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


	    let data;
        if (typeof league !== "undefined"){
        	data = [{ type: "FootballMatchesList", date: "30 de Abril", matches:[{ homeTeam : "Watford", awayTeam: "Aston Villa", hour: "14:00", odds:[1.64, 3.80, 5.40]},{ homeTeam: "West Brom", awayTeam: "West Ham", hour: "14:00", odds:[3.60, 3.35, 2.10]},{ homeTeam: "Stoke City", awayTeam: "Sunderland", hour: "14:00", odds:[2.55, 3.25, 2.80]},{ homeTeam: "Everton", awayTeam: "Bournemouth", hour: "14:00", odds:[1.90, 3.65, 4.00]},{ homeTeam: "Newcastle", awayTeam: "Crystal Palace", hour: "14:00", odds:[1.90, 3.50, 4.10]},{ homeTeam: "Arsenal", awayTeam: "Norwich", hour: "16:30", odds:[1.24, 6.10, 11.5]}]},
        			{ type: "FootballMatchesList", date: "1 de Maio", matches:[{ homeTeam: "Swansea", awayTeam: "Liverpool", hour: "11:00", odds:[3.25, 3.45, 2.20]},{ homeTeam: "Man Utd", awayTeam: "Leicester", hour: "13:00", odds:[2.05, 3.35, 3.75]},{ homeTeam: "Southampton", awayTeam: "Man City", hour: "15:30", odds:[3.15, 3.45, 2.25]}] },
        			{ type: "FootballMatchesList", date: "2 de Maio", matches:[{ homeTeam: "Chelsea", awayTeam: "Tottenham", hour: "19:00", odds:[3.05, 3.45, 2.25]}] }];
    	}
        else {
        	data = [{ title: "Ligas Principais", options:["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1"]},
					{ title: "Internacional", options:["Champions League", "Europa League", "Euro 2016"] },
					{ title: "Europa", options:["Portugal - Primeira Liga", "Portugal - Segunda Liga", "Inglaterra - Championship", "Inglaterra - League One", "Inglaterra - League Two", "Inglaterra - Championship", "Turquia - Super Liga", "Holanda - Eredivise", "Brasil - Serie A", "Escócia - Premiership", "Bélgica - Pro League"] },
					{ title: "Europa", options:["Portugal - Primeira Liga", "Portugal - Segunda Liga", "Inglaterra - Championship", "Inglaterra - League One", "Inglaterra - League Two", "Inglaterra - Championship", "Turquia - Super Liga", "Holanda - Eredivise", "Brasil - Serie A", "Escócia - Premiership", "Bélgica - Pro League"] },
					{ title: "Europa", options:["Portugal - Primeira Liga", "Portugal - Segunda Liga", "Inglaterra - Championship", "Inglaterra - League One", "Inglaterra - League Two", "Inglaterra - Championship", "Turquia - Super Liga", "Holanda - Eredivise", "Brasil - Serie A", "Escócia - Premiership", "Bélgica - Pro League"] }];
			}

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
