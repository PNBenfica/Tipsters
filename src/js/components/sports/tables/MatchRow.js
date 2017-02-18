import React from "react"

import ChoiceTD from "./ChoiceTD"

export default class MatchRow extends React.Component {


  	render() {

        let { name, id, bets, date, addTip, start_date, eventURL, isInBetSlip } = this.props

        eventURL = eventURL.addMatch({name, id})

        const [homeTeam, awayTeam] = name.split(" - ")
        const hour = start_date.split("T")[1].slice(0, -3);
        
        let selections = [homeTeam, "Draw", awayTeam]
        let selectionClass = "col-xs-2 centered"

        if (bets[0].choices.length === 2){
            selections = [homeTeam, awayTeam]
            selectionClass = "col-xs-3 centered"
        }

	    return (        
            <tr>
                <td class="col-xs-6 match-name"><span class="match-hour">{hour}</span> <a href={eventURL.renderPath()}>{name}</a></td>
                {bets[0].choices.map((choice,i) => <ChoiceTD key={i} eventURL={eventURL} bet={bets[0]} choice={choice} addTip={addTip} isInBetSlip={isInBetSlip} classes={selectionClass}>{choice.odd}</ChoiceTD>)}
            </tr>)    
  	}
}
