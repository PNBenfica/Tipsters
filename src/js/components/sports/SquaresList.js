import React from "react"

import Square from "./Square"


export default class SquaresList extends React.Component {

    render() {

    let { activeCode, items } = this.props

    items = items.map((item,i) => <Square key={i} {...item} active={activeCode==item.code} />)

    return (
            <div class="square-list fade-in col-xs-12">
                { items }
            </div>
        )
    }
}
