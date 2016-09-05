import React from "react";

import MatchRow from "./MatchRow"
import Header from "./Header"

export default class MatchesTable extends React.Component {

  	render() {

	    let {date, matches, eventURL,addTip, isInBetSlip} = this.props;

        const Header = this.renderHeader(date, matches[0].bets)
        const Matches = matches.map(({...match}, i) => <MatchRow key={i} {...match} eventURL={eventURL} isInBetSlip={isInBetSlip} addTip={addTip}/>);

	    return (
            <div class="panel panel-default">
                
                {Header}

                <div class="panel-body">                    
                    {Matches}
                </div>
            </div>
	    );
  	}

    renderHeader(date, bets){
        const nMainBetOptions = bets[0].choices.length
        const options = (nMainBetOptions == 2) ? ["1", "2"] : ["1", "X", "2"]
        return <Header title={date} options={options} />
    }

}
