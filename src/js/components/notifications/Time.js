import React from "react"
import classNames from "classnames"

export default class Time extends React.Component {

    render() {

        const { date, type } = this.props
        const iconClasses = classNames('fa','fa-fw', type)

        return (
            <p class="dropdown-menu-item-time">
                <i class={iconClasses}></i>
                <em> {date}</em>
            </p>
        )
    }
}
