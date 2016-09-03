import React from "react";
import classNames from "classnames";

export default class MatchRow extends React.Component {

  	render() {

        let {name, id, bets, date, addTip, start_date, eventURL } = this.props

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
                {bets[0].choices.map((choice,i) => 
                    <a key={i} onClick={() => addTip(eventURL, bets[0], choice)} class={selectionClass}>{choice.odd}</a> )}
            </div>
	    );
  	}
}
