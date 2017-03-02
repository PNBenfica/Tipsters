import React from "react"

import FilterListItem from "./FilterListItem"

export default class FilterList extends React.Component {

    render() {

        const { name, values, active, addFilter } = this.props

        return (
            <div class="col-xs-12 col-sm-4 filter-list">
                <h5>{name}</h5>
                
                <form action="#">
                    {values.map((v,i) => <FilterListItem key={i} value={v} active={active} filterName={name} addFilter={addFilter} />)}
                </form>

            </div>
        )
    }
}
