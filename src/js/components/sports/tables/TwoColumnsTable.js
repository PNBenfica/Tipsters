import React from "react";


export default class TwoColumnsTable extends React.Component {

  	render() {

	    const { eventURL, bet, filters, addTip } = this.props
        
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
            return <a key={i} onClick={() => addTip(eventURL, bet, choice)} class="col-xs-6">{choice.name} <span class="pull-right">{choice.odd}</span></a>
        })

	    return (
            <div class="panel panel-default odds-table">
                <div class="panel-heading">
                    <h3 class="panel-title">{bet.name}</h3>            
                </div>

                <div class="panel-body">        
                    {Options}
                </div>
            </div>
	    );
  	}
}
