import React from "react";

export default class FootballMatchItem extends React.Component {

  	render() {

        const {event, hour, odds} = this.props;

	    return (
            <div class="col-xs-12 league-game">
                <a href="#/sports/premierleague" class="col-xs-6"><small>{hour}</small> {event}</a>
                {odds.map((odd,i) => 
                    <a key={i} href="#/sports/premierleague" class="col-xs-2">{odd}</a> )}
            </div>
	    );
  	}
}
