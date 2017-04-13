import React from "react"

import ListItem from "./ListItem"
import SideBar from "./../SideBar"
import SidebarHeader from "./../SidebarHeader"

export default class UserDropdown extends React.Component {

    render() {

        const { open, close } = this.props

        return (
            <SideBar open={open} close={close}>

                <ul>
                    <ListItem title="Profile" href="#/profile" icon="fa fa-user-o fa-fw" />
                    <ListItem title="Deposits" href="#" icon="fa fa-eur fa-fw" />
                    <ListItem title="Settings" href="#" icon="fa fa-gear fa-fw" />
                    <ListItem title="Logout" href="#" icon="fa fa-sign-out fa-fw" />
                </ul>

            </SideBar>
        )
    }
}
