import React from "react"

import FilterList from "./FilterList"

export default class Filters extends React.Component {


    render() {

        const { addFilter, filters } = this.props

        return (
            <div id="ranking-filters-collapse" class="collapse">
                {filters.map((filter, i) => <FilterList key={i} {...filter} addFilter={addFilter} /> )}
            </div>
        )
    }
}
