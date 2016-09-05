import React from "react";

import Choice from "./Choice"
import Header from "./Header"

export default class GoalsScorersTable extends React.Component {

	render() {

		const { eventURL, bets, addTip, isInBetSlip } = this.props;

		return (
			<div class="panel panel-default odds-table">					
				
                <Header title="Goalscorers" options={["First", "Last", "Anytime"]} />

                <ThreeColumns eventURL={eventURL} bets={bets} addTip={addTip} isInBetSlip={isInBetSlip}/>
			</div>
		);
	}
}

class ThreeColumns extends React.Component{

	render() {

		const { bets, eventURL, addTip, isInBetSlip  } = this.props;
        
        const firstGoalscorer = bets.find(bet => bet.name == "First Goalscorer")
        const lastGoalscorer = bets.find(bet => bet.name == "Last Goalscorer")
        const anytimeGoalscorer = bets.find(bet => bet.name == "Goalscorer")

        const playersNames = firstGoalscorer.choices.map(choice => choice.name)

        const rows = playersNames.map((player, i) => {
        	const options = [firstGoalscorer, lastGoalscorer, anytimeGoalscorer].map((bet, i) => {
        		const choice = bet.choices.find(choice => choice.name == player)
        		if (typeof choice === 'undefined') 
        			return <a key={i} class="empty-option centered bordered col-xs-2">-</a>
        		return <Choice key={i} eventURL={eventURL} bet={bet} choice={choice} addTip={addTip} isInBetSlip={isInBetSlip} classes={"col-xs-2 centered"}>{choice.odd}</Choice>
        	})
                
	        return  (<div key={i}>
			            <a class="col-xs-6">{player}</a>
			            {options}
			        </div>)
        })

	    return (
            <div class="panel-body">  
		        {rows}
            </div>
	    );	
	}
}