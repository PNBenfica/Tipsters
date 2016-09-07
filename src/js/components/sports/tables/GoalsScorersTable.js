import React from "react";

import ChoiceTD from "./ChoiceTD"
import HeaderTH from "./HeaderTH"

export default class GoalsScorersTable extends React.Component {

	render() {
	
		return (
			<table class="table">

			    <HeaderTH title="Goalscorers" options={["First", "Last", "Anytime"]} />

			    {this.renderBody()}
			
			</table>
		);
	}

	renderBody(){

        const players = this.getPlayersList()
        const rows = players.map((player, i) => this.renderPlayerRow(player, i))

	    return (
			<tbody>
				{rows}
			</tbody>
	    );	
    }

    renderPlayerRow(player, i){            
        return  (
        	<tr key={i}>
		        <td class="col-xs-6 not-hovered player-name">{player}</td>
		        {this.renderOdds(player)}
		    </tr>)        
	}

    
	renderOdds(player){
    	return this.getBets().map((bet, i) => this.renderOdd(player, bet, i))
	}

	renderOdd(player, bet, i){
		const { eventURL, addTip, isInBetSlip } = this.props
    	const choice = bet.choices.find(choice => choice.name == player)
		if (typeof choice === 'undefined') 
			return <td key={i} class="empty-option bordered col-xs-2">-</td>
		return <ChoiceTD key={i} eventURL={eventURL} bet={bet} choice={choice} addTip={addTip} isInBetSlip={isInBetSlip} classes={"col-xs-2 centered"}>{choice.odd}</ChoiceTD>
	}

    getPlayersList(){
    	const bet = this.getBet("First Goalscorer")
    	return bet.choices.map(choice => choice.name)
    }

    /*
		* @desc returns First Goalscorer, Last Goalscorer or Goalscorer bet
    */
    getBet(betName){
    	return this.props.bets.find(bet => bet.name == betName)
    }

    getBets(){
    	return [this.getBet("First Goalscorer"), this.getBet("Last Goalscorer"), this.getBet("Goalscorer")]
    }

}