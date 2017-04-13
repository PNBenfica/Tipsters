import React from "react"
import classNames from "classnames"

export default class Time extends React.Component {

    render() {

        const { date, icon } = this.props
        const iconClasses = classNames('fa','fa-fw', icon)

        return (
            <span class="pull-right time">
                <i class={iconClasses}></i>
                <em>{date}</em>
            </span>
        )
    }
}