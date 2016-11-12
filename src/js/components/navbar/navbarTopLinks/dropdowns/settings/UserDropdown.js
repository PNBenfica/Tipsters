import React from "react"

import ListItem from "./ListItem"

export default class UserDropdown extends React.Component {

    render() {

        return (
            <ul class="dropdown-menu" id="user-dropdown">

                <ListItem title="Deposits" ref="#" icon="fa fa-eur fa-fw" />
                <ListItem title="Settings" ref="#" icon="fa fa-gear fa-fw" />

                <li class="divider"></li>

                <ListItem title="Logout" ref="#" icon="fa fa-sign-out fa-fw" />

            </ul>
        )
    }
}
