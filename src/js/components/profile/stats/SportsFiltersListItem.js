import React from "react"

export default class SportsFiltersListItem extends React.Component {

    render() {

    	const { title, removeFilter } = this.props

        return (
            <button onClick={() => removeFilter(title)} class="btn btn-default profile-filter-button">
            	<i class="fa fa-times" aria-hidden="true"></i>
            	{title}
            </button>
        )
    }
}
