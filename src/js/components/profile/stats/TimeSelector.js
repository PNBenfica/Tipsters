import React from "react"
import classNames from "classnames"

import onClickOutside from 'react-onclickoutside'

import TimeSelectorOption from "./TimeSelectorOption"

export default onClickOutside(class TimeSelector extends React.Component {

    handleClickOutside(event){
    	const { open, onFilterClick } = this.props
    	if( open )
    		onFilterClick()
    }

    render() {

    	const { active, open, onFilterClick, onOptionClick } = this.props

    	const options = ["Last Week", "Last Month" , "Ever"].map((option, i) => <TimeSelectorOption key={i} title={option} active={option === active} onClick={onOptionClick}/>)

        return (

			<div class="stats-filters">

                <div class="button" onClick={() => onFilterClick()}><i class="fa fa-filter"/></div>
				
				<div class={classNames( "panel", "_dropdown", { open })} >
					<ul>
						{options}
					</ul>
				</div>
				
			</div>
        )
    }
})
