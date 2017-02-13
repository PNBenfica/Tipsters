import React from "react"


export default class TipRow extends React.Component {

    render() {

        const { title, value} = this.props

        return (
            <div class="tip-row">
                <div class="info">{title}</div>
                <div class="value">{value}</div>
            </div>
        )
    }
}
