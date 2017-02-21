import React from "react"
import classNames from "classnames"

import NotificationsContainer from "./../../../../notifications/NotificationsContainer"
import Footer from "./Footer"

export default class NotificationsDropdown extends React.Component {



            // <ul class="dropdown-menu dropdown-notifications">

            //     <NotificationsContainer/>

            //     <li class="divider"></li>
                
            //     <Footer />
            // </ul>

    render() {

        const { open } = this.props

        return (
        	<div class={classNames("sidebar-right", { open } )}>
        		Notifications
        	</div>
        )
    }
}
