import React from "react"

import NotificationsContainer from "./../../../../notifications/NotificationsContainer"
import Footer from "./Footer"

export default class NotificationsDropdown extends React.Component {

    render() {

        return (
            <ul class="dropdown-menu dropdown-notifications">

                <NotificationsContainer/>

                <li class="divider"></li>
                
                <Footer />
            </ul>
        )
    }
}
