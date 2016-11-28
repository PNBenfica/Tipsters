import React from "react"

import Filters from "./Filters"

export default class FiltersButton extends React.Component {


    render() {

        const { addFilter, filters } = this.props

        return (
            <div id="ranking-filters">     
                <i data-toggle="collapse" data-target="#ranking-filters-collapse" class="fa fa-filter" aria-hidden="true"></i>

                <Filters filters={filters} addFilter={addFilter}/>

            </div>
        )
    }
}
