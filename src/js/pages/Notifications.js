import React from "react";

import PageWithTrendBar from "./PageWithTrendBar"
import NotificationsContainer from "../components/notifications/NotificationsContainer"
import NotificationsHeader from "../components/notifications/NotificationsHeader"

export default class Notifications extends React.Component {

	render() {
        
	    return (
			<PageWithTrendBar>

				<div id="notifications-page" class="col-lg-6 col-md-8 col-lg-push-1">

					<NotificationsHeader />

					<div id="notifications-page-not-container" class="col-xs-12">
						<NotificationsContainer />
					</div>
				</div>

			</PageWithTrendBar>
	    );
	}
}

