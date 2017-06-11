import React from "react"
import { connect } from "react-redux";
import classNames from "classnames";

import { fetchNotifications, markAsSeen } from "../../../../../actions/notificationsActions";

import EmptyNotifications from "./EmptyNotifications"
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
        const fetchNotifications = setInterval(this.fetchNotifications.bind(this), 1000000)
        this.setState( { fetchNotifications } )
    }


    componentWillUnmount() {
        clearInterval(this.state.fetchNotifications)
    }

    fetchNotifications(){
        this.props.dispatch(fetchNotifications())
    }

    componentWillReceiveProps(nextProps){
        const { notifications } = this.props
        if (notifications.length < nextProps.notifications.length){
            this.scrollNotificationsTop()
        }
    }

    scrollNotificationsTop(){
        if (this.refs.notificationsList.scrollTop > 0){
            this.refs.notificationsList.scrollTop -= 1
            setTimeout(this.scrollNotificationsTop.bind(this), 0)
        }
    }


    markNotificationAsSeen(notificationId){
        this.props.dispatch(markAsSeen(notificationId))
    }

    render() {

        let { notifications } = this.props

        if (notifications.length > 0){
            notifications = notifications.map((notification, i) => <NotificationItem key={i} {...notification} markAsSeen={this.markNotificationAsSeen.bind(this)}/> )
        }
        else{
            notifications = <EmptyNotifications />
        }

        return (
            <ul ref="notificationsList">
                {notifications}
            </ul>
        )
    }
}
