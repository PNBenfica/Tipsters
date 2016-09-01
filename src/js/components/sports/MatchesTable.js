import React from "react";

import MatchRow from "./MatchRow";
import MatchesTableHeader from "./MatchesTableHeader";

export default class MatchesTable extends React.Component {

  	render() {

	    let {date, matches, baseRef,addTip} = this.props;

        const Matches = matches.map(({...match}, i) => <MatchRow key={i} {...match} baseRef={baseRef} addTip={addTip}/>);

	    return (
            <div class="panel panel-default">
                
                <MatchesTableHeader date={date} bets={matches[0].bets} />

                <div class="panel-body">                    
                    {Matches}
                </div>
            </div>
	    );
  	}
}
