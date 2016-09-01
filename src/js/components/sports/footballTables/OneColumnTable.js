import React from "react";


export default class OneColumnTable extends React.Component {

  	render() {

	    const { eventName, bet, addTip } = this.props
        
        const Options = bet.choices.map((choice,i) => <a key={i} onClick={() => addTip(bet.name+": "+choice.name, eventName, choice.odd)} class="col-xs-12">{choice.name} <span class="pull-right">{choice.odd}</span></a>)

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
