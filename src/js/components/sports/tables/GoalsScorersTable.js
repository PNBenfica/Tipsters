import React from "react";

import HeaderThreeOptions from "./headers/HeaderThreeOptions";


export default class GoalsScorersTable extends React.Component {

	render() {

		const { eventURL, bets, addTip} = this.props;

		return (
			<div class="panel panel-default odds-table">					
				
                <HeaderThreeOptions name="Goalscorers" options={["First", "Last", "Anytime"]} />

                <ThreeColumns eventURL={eventURL} bets={bets} addTip={addTip} />
			</div>
		);
	}
}

class ThreeColumns extends React.Component{

	render() {

		const { bets, eventURL, addTip } = this.props;
        
        const firstGoalscorer = bets.find(bet => bet.name == "First Goalscorer")
        const lastGoalscorer = bets.find(bet => bet.name == "Last Goalscorer")
        const anytimeGoalscorer = bets.find(bet => bet.name == "Goalscorer")

        const playersNames = firstGoalscorer.choices.map(choice => choice.name)

        const rows = playersNames.map((player, i) => {
        	const options = [firstGoalscorer, lastGoalscorer, anytimeGoalscorer].map((bet, i) => {
        		const choice = bet.choices.find(choice => choice.name == player)
        		if (typeof choice === 'undefined') 
        			return <a key={i} class="empty-option centered bordered col-xs-2">-</a>
        		return <a key={i} onClick={() => addTip(eventURL, bet, choice)} class="col-xs-2 centered">{choice.odd}</a>
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