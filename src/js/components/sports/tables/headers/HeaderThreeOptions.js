import React from "react";

export default class HeaderThreeOptions extends React.Component{

	render() {

        let { name, options } = this.props

        options = options.map((option, i) => <h3 key={i} class="col-xs-2 panel-title league-game-selection-type">{option}</h3>)

	    return (
            <div class="panel-heading col-xs-12 no-padding-sides">
                <h3 class="panel-title col-xs-6">Goalscorers</h3>     
                {options}
            </div>
	    );		
	}
}