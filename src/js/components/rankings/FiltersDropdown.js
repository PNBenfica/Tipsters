import React from "react"
import classNames from "classnames"

import Filters from "./Filters"

export default class FiltersDropdown extends React.Component {


    render() {

        const { addFilter, applyFilters, filters, open } = this.props

        return (
            <div class={classNames("panel _dropdown", {open})}>
               <Filters filters={filters} addFilter={addFilter}/>

               <div class="button-container">
                   <div class="button" onClick={() => applyFilters()}><span>FILTRAR</span></div>
               </div>

            </div>
        )
    }
}
