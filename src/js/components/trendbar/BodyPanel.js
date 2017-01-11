import React from "react"

export default class BodyPanel extends React.Component {

    render() {

        const { item } = this.props

        return (
            <div class="trend-bar-item">
                {item}
            </div>
        )
    }

}
