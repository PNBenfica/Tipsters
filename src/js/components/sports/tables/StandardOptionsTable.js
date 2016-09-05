import React from "react";

import Choice from "./Choice"
import Header from "./Header"

export default class StandardOptionsTable extends React.Component {

  	render() {

	    const { bet, eventURL, addTip, isInBetSlip } = this.props

        let Options = []
        Options = bet.choices.map((choice,i) => 
            <Choice key={i} eventURL={eventURL} bet={bet} choice={choice} addTip={addTip} isInBetSlip={isInBetSlip} classes={"col-xs-12 col-sm-4"}>{choice.name} <span class="pull-right">{choice.odd}</span></Choice> )

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
