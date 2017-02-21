import React from "react"

import DropdownIcon from "./DropdownIcon"
import NotificationsDropdown from "./dropdowns/notifications/NotificationsDropdown"

export default class NotificationsLink extends React.Component {

    render() {

        const { notifications, nNew, onClick, markAsSeen, open } = this.props

        return (
            <div class="link" onClick={() => onClick()}>

                <DropdownIcon icon="fa-bell-o" badge="badge-green" newItems={nNew}/>

                <NotificationsDropdown open={open} notifications={notifications} markAsSeen={markAsSeen}/>
                
            </div>

        )
    }
}
