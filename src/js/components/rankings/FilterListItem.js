import React from "react"

import className from "classnames"

export default class FilterListItem extends React.Component {

    render() {

        const { filterName, value, active, addFilter } = this.props

        return (
            <div onClick={()=> {addFilter(filterName, value)}}>
                <input type="radio" checked={value==active} onChange={()=> {addFilter(filterName, value)}} />
                <label><span class="outer"><span class="inner"></span></span>{value}</label>
            </div>
        )
    }
}
