import React from "react"

export default class Time extends React.Component {

    render() {

        const { date } = this.props

        return (
            <span class="pull-right time">
                <i class="fa fa-clock-o fa-fw"></i>
                <em>{date}</em>
            </span>
        )
    }
}
