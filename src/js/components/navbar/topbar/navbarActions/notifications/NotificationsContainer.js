import React from "react"
import { connect } from "react-redux";
import classNames from "classnames";

import { fetchNotifications, markAsSeen } from "../../../../../actions/notificationsActions";


import NotificationItem from "./NotificationItem"

@connect((store) => {
  return {
    notifications: store.notifications.notifications,
    fetched: store.notifications.fetched,
    fetching: store.notifications.fetching,
  };
})
export default class NotificationsContainer extends React.Component {

    
    componentWillMount() {
        this.fetchNotifications()
    }

    fetchNotifications(){
        this.props.dispatch(fetchNotifications())
    }

    markNotificationAsSeen(notificationId){
        this.props.dispatch(markAsSeen(notificationId))
    }

    render() {

        const Notifications = this.props.notifications.map((notification, i) => <NotificationItem key={i} {...notification} markAsSeen={this.markNotificationAsSeen.bind(this)}/> )
        const containerClasses = classNames("notifications-container", "dropdown-content-container")

        return (
            <ul>
                {Notifications}
            </ul>
        )
    }
}
