import React from "react"

import LoadMoreDropdownItems from "./../LoadMoreDropdownItems"
import NotificationItem from "./NotificationItem"
import Footer from "./Footer"

export default class NotificationsDropdown extends React.Component {

    render() {

        const Notifications = this.props.notifications.map((notification, i) => <NotificationItem key={i} {...notification} markAsSeen={this.props.markAsSeen}/> )


        return (
            <ul class="dropdown-menu dropdown-notifications">

                <div class="dropdown-content-container">
                    {Notifications}
                    <LoadMoreDropdownItems />
                </div>

                <li class="divider"></li>
                
                <Footer />
            </ul>
        )
    }
}
