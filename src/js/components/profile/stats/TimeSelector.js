import React from "react"

import TimeSelectorOption from "./TimeSelectorOption"

export default class TimeSelector extends React.Component {


    render() {

    	const { active, onOptionClick } = this.props

    	const options = ["Last Week", "Last Month" , "Ever"].map((option, i) => <TimeSelectorOption key={i} title={option} active={option === active} onClick={onOptionClick}/>)

        return (

			<div class="dropdown pull-right">
				<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Filter <span class="caret"></span></button>
				
				<ul class="dropdown-menu">
					{options}
				</ul>
				
			</div>
        )
    }
}
