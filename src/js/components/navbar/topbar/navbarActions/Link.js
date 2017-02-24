import React from "react"
import classNames from "classnames"

export default class Link extends React.Component {

    render() {

        const {icon, badge, newItems, clearBadge} = this.props

        const iconClass = classNames("fa", "fa-fw", icon)
        const badgeClass = classNames("font-awesome-badge", badge, {hidden:newItems==0})

        return (
            <i class={iconClass}><span class={badgeClass}>{newItems}</span></i>
        )
    }
}
