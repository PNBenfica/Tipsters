import React from "react";

import BetSlip from "../components/sports/betslip/BetSlip";
import Breadcrumb from "../components/sports/Breadcrumb";
import FootballMatchesTable from "../components/sports/FootballMatchesTable";
import SportTable from "../components/sports/SportTable";
import TipsOnThisEvent from "../components/sports/chatpanel/TipsOnThisEvent";

export default class Sports extends React.Component {

    constructor(...args) {
        super(...args);
        if (typeof this.props.params.league !== "undefined"){
        this.state = {data: [{ type: "FootballMatchesList", date: "30 de Abril", matches:[{ event: "Watford vs Aston Villa", hour: "14:00", odds:[1.64, 3.80, 5.40]},{ event: "West Brom vs West Ham", hour: "14:00", odds:[3.60, 3.35, 2.10]},{ event: "Stoke City vs Sunderland", hour: "14:00", odds:[2.55, 3.25, 2.80]},{ event: "Everton vs Bournemouth", hour: "14:00", odds:[1.90, 3.65, 4.00]},{ event: "Newcastle vs Crystal Palace", hour: "14:00", odds:[1.90, 3.50, 4.10]},{ event: "Arsenal vs Norwich", hour: "16:30", odds:[1.24, 6.10, 11.5]}]},
        					 { type: "FootballMatchesList", date: "1 de Maio", matches:[{ event: "Swansea vs Liverpool", hour: "11:00", odds:[3.25, 3.45, 2.20]},{ event: "Man Utd vs Leicester", hour: "13:00", odds:[2.05, 3.35, 3.75]},{ event: "Southampton vs Man City", hour: "15:30", odds:[3.15, 3.45, 2.25]}] },
        					 { type: "FootballMatchesList", date: "2 de Maio", matches:[{ event: "Chelsea vs Tottenham", hour: "19:00", odds:[3.05, 3.45, 2.25]}] }
        ]};
    	}
        else {
        this.state = {data: [{ title: "Ligas Principais", options:["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1"]},
							{ title: "Internacional", options:["Champions League", "Europa League", "Euro 2016"] },
							{ title: "Europa", options:["Portugal - Primeira Liga", "Portugal - Segunda Liga", "Inglaterra - Championship", "Inglaterra - League One", "Inglaterra - League Two", "Inglaterra - Championship", "Turquia - Super Liga", "Holanda - Eredivise", "Brasil - Serie A", "Escócia - Premiership", "Bélgica - Pro League"] },
							{ title: "Europa", options:["Portugal - Primeira Liga", "Portugal - Segunda Liga", "Inglaterra - Championship", "Inglaterra - League One", "Inglaterra - League Two", "Inglaterra - Championship", "Turquia - Super Liga", "Holanda - Eredivise", "Brasil - Serie A", "Escócia - Premiership", "Bélgica - Pro League"] },
							{ title: "Europa", options:["Portugal - Primeira Liga", "Portugal - Segunda Liga", "Inglaterra - Championship", "Inglaterra - League One", "Inglaterra - League Two", "Inglaterra - Championship", "Turquia - Super Liga", "Holanda - Eredivise", "Brasil - Serie A", "Escócia - Premiership", "Bélgica - Pro League"] }

        ]};

        }
    }
  	
  	render() {

	  	const {sport, league} = this.props.params;

	  	const Tables = this.state.data.map((table, i) =>{
	  		if (table.type === "FootballMatchesList")
	  			return <FootballMatchesTable key={i} date={table.date} matches={table.matches}/>;
	  		else
	  			return <SportTable key={i} title={table.title} options={table.options}/>
	  	});

	    return (

	        <div class="row">
	            {/*<!-- league tables -->*/}
	            <div class="league-tables col-lg-8 sports-table-container">
	                
	                <Breadcrumb sport={sport} league={league}/>	                

	                {Tables}

	            </div> {/*<!-- league tables -->*/}


	            <div class="col-lg-4 hidden-md hidden-sm hidden-xs right-sports-bar-container">

	            	<BetSlip />

	                <TipsOnThisEvent />

	            </div>
	        </div>
	    );
  	}
}
