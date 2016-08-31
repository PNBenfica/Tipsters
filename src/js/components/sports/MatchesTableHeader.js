import React from "react";
import classNames from "classnames";

import MatchRow from "./MatchRow";
import MatchesTableHeader from "./MatchesTableHeader";

export default class MatchesTable extends React.Component {

  	render() {

	    let {date, bets} = this.props;

        const nMainBetOptions = (typeof bets !== 'undefined') ? bets[0].choices.length : 0
        
        let options = []
        let optionColClass = ""

        if (nMainBetOptions === 2){
            options = ["1","2"]
            optionColClass = "col-xs-3"
        }
        else if (nMainBetOptions === 3){
            options = ["1", "X", "2"]
            optionColClass = "col-xs-2"
        }
        const optionClasses = classNames("panel-title", "league-game-selection-type", optionColClass )

        options = options.map((option, i) => <h3 key={i} class={optionClasses}>{option}</h3>);

	    return (
            <div class="panel-heading col-xs-12 no-padding-sides">
                <h3 class="panel-title col-xs-6">{date}</h3>     
                {options}           
            </div>
	    );
  	}
}
