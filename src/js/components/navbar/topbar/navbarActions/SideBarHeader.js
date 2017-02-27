import React from "react"
import classNames from "classnames"

export default class SidebarHeader extends React.Component {

    render() {

        const { title, icon } = this.props
        const iconClasses = classNames('fa','fa-fw', icon)

        return (
            <header>
                <i class={iconClasses}></i>
                <h2>{title}</h2>
            </header>
        )
    }
}
