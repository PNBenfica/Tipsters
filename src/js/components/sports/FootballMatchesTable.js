import React from "react";

import FootballMatchItem from "./FootballMatchItem";

export default class FootballMatchesTable extends React.Component {

  	render() {

	    let {date, matches, addTip} = this.props;

        matches = matches.map(({...match}, i) => <FootballMatchItem key={i} {...match} addTip={addTip}/>);

	    return (
            <div class="panel panel-default">
                <div class="panel-heading col-xs-12 no-padding-sides">
                    <h3 class="panel-title col-xs-6">{date}</h3>     
                    <h3 class="panel-title col-xs-2 league-game-selection-type">1</h3>    
                    <h3 class="panel-title col-xs-2 league-game-selection-type">X</h3>    
                    <h3 class="panel-title col-xs-2 league-game-selection-type">2</h3>           
                </div>

                <div class="panel-body">                    
                    {matches}
                </div>
            </div>
	    );
  	}
}
