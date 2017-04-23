import React from "react"

export default class SportsFiltersListItem extends React.Component {

    render() {

    	const { title, removeFilter } = this.props

        return (
            <div onClick={() => removeFilter(title)} class="button">
            	<span>
            	<i class="fa fa-times" aria-hidden="true"></i>
            	{title}</span>
            </div>
        )
    }
}
