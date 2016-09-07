import React from "react";
import classNames from "classnames";

export default class HeaderTH extends React.Component{

	render() {

        let { title, options =[] } = this.props

        const optionClasses = classNames("centered", {"col-xs-2": options.length == 3}, {"col-xs-3": options.length == 2} )

        options = options.map((option, i) => <th key={i} class={optionClasses}>{option}</th>)

	    return (
            <thead>
                <tr>
                    <th class="col-xs-6">{title}</th>
                    {options}
                </tr>
            </thead>
	    );		
	}
}

