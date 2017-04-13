import React from "react"
import classNames from "classnames"

import NotificationsContainer from "./NotificationsContainer"
import SideBar from "./../SideBar"
import SidebarHeader from "./../SidebarHeader"

export default class NotificationsSidebar extends React.Component {

    render() {

        const { open, close } = this.props

        return (
            <SideBar open={open} close={close}>

                <SidebarHeader title={"Notifications"} icon={"fa-bell-o"}/>

                <NotificationsContainer/>

            </SideBar>
        )
    }
}
