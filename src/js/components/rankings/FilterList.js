import React from "react"

import FilterListItem from "./FilterListItem"

export default class FilterList extends React.Component {

    render() {

        const { name, values, active, addFilter } = this.props

        return (
            <div id="ranking-filters-collapse" class="collapse in">
                <div class="col-xs-8 col-sm-2 filter-list pull-right">
                    <h5>{name}</h5>
                    {values.map((v,i) => <FilterListItem key={i} value={v} active={active} filterName={name} addFilter={addFilter} />)}
                </div>
            </div>
        )
    }
}
