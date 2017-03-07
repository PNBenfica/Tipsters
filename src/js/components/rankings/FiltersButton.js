import React from "react"

import FiltersDropdown from "./FiltersDropdown"

export default class FiltersButton extends React.Component {


    render() {

        const { addFilter, applyFilters, filters, open, onIconClick } = this.props

        return (
            <div id="ranking-filters">     

                <div class="button" onClick={() => onIconClick()}><i class="fa fa-filter"/></div>

                <FiltersDropdown open={open} filters={filters} addFilter={addFilter} applyFilters={applyFilters} />

            </div>
        )
    }
}
