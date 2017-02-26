import React from "react"
import classNames from "classnames"

import NotificationsContainer from "./NotificationsContainer"
import NotificationsSidebarHeader from "./NotificationsSidebarHeader"

export default class NotificationsSidebar extends React.Component {



            // <ul class="dropdown-menu dropdown-notifications">

            //     <NotificationsContainer/>

            //     <li class="divider"></li>
                
            //     <Footer />
            // </ul>

    render() {

        const { open } = this.props

        return (
        	<div class={classNames("sidebar-right", { open } )}>

                <NotificationsSidebarHeader />

                <NotificationsContainer/>

        	</div>
        )
    }
}
