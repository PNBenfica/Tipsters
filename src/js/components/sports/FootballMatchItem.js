import React from "react";

export default class FootballMatchItem extends React.Component {

  	render() {

        const {homeTeam, awayTeam, hour, odds, addTip} = this.props;
        const eventName = homeTeam + " vs " + awayTeam;
        const eventRef = "#/sports/football/premier-league/"+homeTeam+"-vs-"+awayTeam;
        const selections = [homeTeam, "Draw", awayTeam];

	    return (
            <div class="col-xs-12 league-game">
                <a href={eventRef} class="col-xs-6"><small>{hour}</small> {eventName}</a>
                {odds.map((odd,i) => 
                    <a key={i} onClick={() => addTip(selections[i], eventName, odd)} class="col-xs-2">{odd.toFixed(2)}</a> )}
            </div>
	    );
  	}
}
