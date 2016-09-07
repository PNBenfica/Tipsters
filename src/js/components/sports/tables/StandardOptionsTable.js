import React from "react";

import Choice from "./Choice"
import Header from "./Header"

export default class StandardOptionsTable extends React.Component {

  	render() {

	    const { bet, eventURL, addTip, isInBetSlip } = this.props

        let Options = []
        const maxLength = Math.max(...bet.choices.map(choice => choice.name.length))
        Options = bet.choices.map((choice,i) => 
            <Choice key={i} eventURL={eventURL} bet={bet} choice={choice} maxLength={maxLength} addTip={addTip} isInBetSlip={isInBetSlip} classes={"col-xs-12 col-sm-6 col-md-4"}><div class="col-xs-10 no-padding-sides">{choice.name}</div> <span class="col-xs-2 centered">{choice.odd}</span></Choice> )

	    return (
            <div class="panel panel-default odds-table">
                
                <Header title={bet.name} />

                <div class="panel-body">        
                    {Options}
                </div>
            </div>
	    );
  	}
}
