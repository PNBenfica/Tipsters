import React from "react"

import Link from "./../Link"
import NotificationsSidebar from "./NotificationsSidebar"

export default class NotificationsLink extends React.Component {

    render() {

        const { notifications, nNew, onClick, markAsSeen, open } = this.props

        return (
            <div class="link" onClick={() => onClick()}>

                <Link icon="fa-bell-o" badge="badge-green" newItems={nNew}/>

                <NotificationsSidebar open={open} close={onClick} notifications={notifications} markAsSeen={markAsSeen}/>
                
            </div>
        )
    }
}
