import React from "react"
import classNames from "classnames"

import TimeAgo from "./../TimeAgo"

export default class Time extends React.Component {

    render() {

        const { date, icon } = this.props
        const iconClasses = classNames('fa','fa-fw', icon)

        return (
            <span class="time">
                <i class={iconClasses}></i>
                <TimeAgo date={date} />
            </span>
        )
    }
}