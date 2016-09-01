import React from "react";


export default class ThreeColumnsTable extends React.Component {

  	render() {

	    const { eventName, bet, filters, addTip } = this.props
        
        const col1 = bet.choices.filter(filters[0])
        const col2 = bet.choices.filter(filters[1])
        const col3 = bet.choices.filter(filters[2])
        
        let Options = []
        for (var i = 0; i < Math.max(col1.length,col2.length); i++) {
            Options.push(i >= col1.length ? "" : col1[i])
            Options.push(i >= col2.length ? "" : col2[i])
            Options.push(i >= col3.length ? "" : col3[i])
        }

        Options = Options.map((choice,i) => {
            if(choice === "")
                return <a key={i} class="empty-option col-xs-4">-</a>
            return <a key={i} onClick={() => addTip(bet.name+": "+choice.name, eventName, choice.odd)} class="col-xs-4">{choice.name} <span class="pull-right">{choice.odd}</span></a>
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
