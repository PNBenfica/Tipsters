import React from "react"

import Choice from "./Choice"

export default class MatchRow extends React.Component {


  	render() {

        let { name, id, bets, date, addTip, start_date, eventURL, isInBetSlip } = this.props

        eventURL = eventURL.addMatch({name, id})

        const [homeTeam, awayTeam] = name.split(" - ")
        const hour = start_date.split("T")[1].slice(0, -3);
        
        let selections = [homeTeam, "Draw", awayTeam]
        let selectionClass = "col-xs-2"

        if (bets[0].choices.length === 2){
            selections = [homeTeam, awayTeam]
            selectionClass = "col-xs-3"
        }

	    return (
            <div class="col-xs-12 league-game">
                <a href={eventURL.renderPath()} class="col-xs-6"><small>{hour}</small> {name}</a>
                {bets[0].choices.map((choice,i) => <Choice key={i} eventURL={eventURL} bet={bets[0]} choice={choice} addTip={addTip} isInBetSlip={isInBetSlip} classes={selectionClass}>{choice.odd}</Choice>)}
            </div>
	    );
  	}
}
