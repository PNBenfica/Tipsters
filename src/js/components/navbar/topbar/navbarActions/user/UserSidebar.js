import React from "react"

import ListItem from "./ListItem"
import SideBar from "./../SideBar"
import SidebarHeader from "./../SidebarHeader"

export default class UserDropdown extends React.Component {

    logout(){
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
    }

    render() {

        const { open, close } = this.props

        return (
            <SideBar open={open} close={close} classes="user-sidebar">

                <ul>
                    <ListItem title="Profile" href={"#/profile/" + localStorage.getItem('username')} icon="fa fa-user-o fa-fw" />
                    <ListItem onClick={this.logout.bind(this)} href="/" title="Logout" href="#" icon="fa fa-sign-out fa-fw" />
                </ul>

            </SideBar>
        )
    }
}
