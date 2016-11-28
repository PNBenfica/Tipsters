import React from "react"

import FiltersButton from "./FiltersButton"
import SearchBar from "./SearchBar"

export default class FiltersContainer extends React.Component {


    render() {

        const { addFilter, addSearchFilter, filters } = this.props

        return (
            <div id="search-bar" class="row">
                <div class="col-xs-12">
                    
                    <SearchBar addSearchFilter={addSearchFilter}/>

                    <FiltersButton filters={filters} addFilter={addFilter}/>
                
                </div>
            </div>
        )
    }
}
