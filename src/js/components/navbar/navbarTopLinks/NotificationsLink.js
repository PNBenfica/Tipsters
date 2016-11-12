import React from "react"

import DropdownIcon from "./DropdownIcon"
import NotificationsDropdown from "./dropdowns/notifications/NotificationsDropdown"

export default class NotificationsLink extends React.Component {

    render() {

        const { notifications, nNew, clearBadge, markAsSeen } = this.props

        return (
            <li class="dropdown">

                <DropdownIcon icon="fa-bell-o" badge="badge-green" badgeMargin="27px" newItems={nNew} clearBadge={clearBadge}/>

                <NotificationsDropdown notifications={notifications} markAsSeen={markAsSeen}/>
                
            </li>

        )
    }
}
