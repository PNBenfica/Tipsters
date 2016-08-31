import React from "react";
import classNames from "classnames";

export default class MatchRow extends React.Component {

  	render() {

        const {name, id, bets, date, addTip, start_date, sportRef} = this.props
        const eventRef = "#/sports/" + sportRef + "/" + name + "/" + id
        const [homeTeam, awayTeam] = name.split("-")
        const hour = start_date.split("T")[1].slice(0, -3);
        
        let selections = [homeTeam, "Draw", awayTeam]
        let selectionClass = "col-xs-2"

        if (typeof bets === 'undefined')
            return null

        if (bets[0].choices.length === 2){
            selections = [homeTeam, awayTeam]
            selectionClass = "col-xs-3"
        }

	    return (
            <div class="col-xs-12 league-game">
                <a href={eventRef} class="col-xs-6"><small>{hour}</small> {name}</a>
                {bets[0].choices.map((bet,i) => 
                    <a key={i} onClick={() => addTip(selections[i], name, bet.odd)} class={selectionClass}>{bet.odd}</a> )}
            </div>
	    );
  	}
}
