import React from "react"

import SportsFiltersListItem from "./SportsFiltersListItem"

export default class SportsFiltersList extends React.Component {

    render() {

    	const { list, removeFilter } = this.props
    	const filterList = list.map((item,i) => <SportsFiltersListItem key={i} title={item} removeFilter={removeFilter}/> )

        return (
            <div class="col-xs-12 active-filters-buttons">

		        {filterList}

            </div>
        )
    }
}
