import React from "react";

import Choice from "./Choice"
import Header from "./Header"

export default class TwoColumnsTable extends React.Component {

  	render() {

	    const { eventURL, bet, filters, addTip, isInBetSlip } = this.props
        
        let Options = []
        if (filters.length > 0){
            const col1 = bet.choices.filter(filters[0])
            const col2 = bet.choices.filter(filters[1])

            for (var i = 0; i < Math.max(col1.length,col2.length); i++) {
                Options.push(i >= col1.length ? "" : col1[i])
                Options.push(i >= col2.length ? "" : col2[i])
            }
        }
        else
            Options = bet.choices

        Options = Options.map((choice,i) => {
            if(choice === "")
                return <a key={i} class="empty-option col-xs-6">-</a>
            return <Choice key={i} eventURL={eventURL} bet={bet} choice={choice} addTip={addTip} isInBetSlip={isInBetSlip} classes={"col-xs-6"}><div class="col-xs-10 no-padding-sides">{choice.name}</div> <span class="col-xs-2 centered">{choice.odd}</span></Choice>
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
