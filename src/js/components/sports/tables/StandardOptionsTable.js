import React from "react";


export default class StandardOptionsTable extends React.Component {

  	render() {

	    const { bet, eventURL, addTip } = this.props

        let Options = []
        if (typeof bet.choices !== 'undefined')
            Options = bet.choices.map((choice,i) => 
                <a key={i} onClick={() => addTip(eventURL, bet, choice)} class="col-xs-12 col-sm-4">{choice.name} <span class="pull-right">{choice.odd}</span></a> )

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
