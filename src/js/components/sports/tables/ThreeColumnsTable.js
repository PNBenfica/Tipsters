import React from "react";

import Choice from "./Choice"
import Header from "./Header"

export default class ThreeColumnsTable extends React.Component {

  	render() {

	    const { eventURL, bet, filters, addTip, isInBetSlip } = this.props
        
        const col1 = bet.choices.filter(filters[0])
        const col2 = bet.choices.filter(filters[1])
        const col3 = bet.choices.filter(filters[2])
        
        let Options = []
        for (var i = 0; i < Math.max(col1.length,col2.length, col3.length); i++) {
            Options.push(i >= col1.length ? "" : col1[i])
            Options.push(i >= col2.length ? "" : col2[i])
            Options.push(i >= col3.length ? "" : col3[i])
        }

        Options = Options.map((choice,i) => {
            if(choice === "")
                return <a key={i} class="empty-option col-xs-4">-</a>
            return <Choice key={i} eventURL={eventURL} bet={bet} choice={choice} addTip={addTip} isInBetSlip={isInBetSlip} classes={"col-xs-4"}>{choice.name} <span class="pull-right">{choice.odd}</span></Choice>
        })

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
