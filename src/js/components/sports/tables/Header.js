import React from "react";
import classNames from "classnames";

export default class Header extends React.Component{

	render() {

        let { title, options =[] } = this.props

        const titleClasses = classNames("panel-title", {"": options.length>0}, {"": options.length==0}) 
        const optionClasses = classNames("panel-title", "league-game-selection-type", {"col-xs-2": options.length == 3}, {"col-xs-3": options.length == 2} )

        options = options.map((option, i) => <h3 key={i} class={optionClasses}>{option}</h3>)

	    return (
            <div class="panel-heading">
                <h3 class={titleClasses}>{title}</h3>     
                {options}
            </div>
	    );		
	}
}