import React from "react"
import classNames from "classnames"

export default class Link extends React.Component {

    render() {

        const {icon, badge, newItems, clearBadge} = this.props

        const badgeClass = classNames("font-awesome-badge", badge, {hidden:newItems==0})

            // <i class={iconClass}><span class={badgeClass}>{newItems}</span></i>
        return (
        	<svg><use xlinkHref={icon} /></svg>
        )
    }
}
