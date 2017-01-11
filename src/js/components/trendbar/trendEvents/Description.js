import React from "react"


export default class Description extends React.Component {

    render() {

        const { description } = this.props

        return (
            <div class="panel-footer">
                <span class="small-text">{description}</span>
            </div>
        )
    }
}
