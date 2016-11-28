import React from "react"

import className from "classnames"

export default class FilterListItem extends React.Component {

    render() {

        const { filterName, value, active, addFilter } = this.props

        return (
            <p class={className({active:value==active})} onClick={() => addFilter(filterName, value)} >{value}</p>
        )
    }
}
