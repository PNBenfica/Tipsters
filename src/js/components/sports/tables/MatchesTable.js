import React from "react";

import MatchRow from "./MatchRow"
import HeaderTH from "./HeaderTH"

export default class MatchesTable extends React.Component {

  	render() {

	    let {date, matches, eventURL,addTip, isInBetSlip} = this.props;

        const Header = this.renderHeader(date, matches[0].bets)
        const Matches = matches.map(({...match}, i) => <MatchRow key={i} {...match} eventURL={eventURL} isInBetSlip={isInBetSlip} addTip={addTip}/>);

	    return (
            <table class="table">
                
                {Header}

                <tbody>
                    {Matches}
                </tbody>

            </table>
	    );
  	}

    renderHeader(date, bets){
        const nMainBetOptions = bets[0].choices.length
        const options = (nMainBetOptions == 2) ? ["1", "2"] : ["1", "X", "2"]
        return <HeaderTH title={date} options={options} />
    }

}
