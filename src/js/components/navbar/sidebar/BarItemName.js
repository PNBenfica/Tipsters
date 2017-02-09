import React from "react"

export default class BarItemName extends React.Component {

    render() {

        const { name } = this.props

        return (
            <div class="name">{ name }</div>
        )
    }
}
