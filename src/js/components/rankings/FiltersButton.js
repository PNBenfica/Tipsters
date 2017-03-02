import React from "react"

import Filters from "./Filters"

export default class FiltersButton extends React.Component {


    render() {

                // <Filters filters={filters} addFilter={addFilter}/>
	            //<div class="filters-dropdown">
	            //    Ola
	            //</div>
        const { addFilter, filters } = this.props

        return (
            <div id="ranking-filters">     
                <i class="fa fa-filter"></i>
            </div>
        )
    }
}
