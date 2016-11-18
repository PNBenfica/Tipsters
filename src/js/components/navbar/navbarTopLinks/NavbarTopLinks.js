import React from "react"
import { connect } from "react-redux";

import { fetchMessages, setMessagesNotNew, openMessage } from "../../../actions/messagesActions";
import { setNotificationsNotNew } from "../../../actions/notificationsActions";

import MessagesLink from "./MessagesLink"
import NotificationsLink from "./NotificationsLink"
import SearchLink from "./SearchLink"
import UserAvatarLink from "./UserAvatarLink"


@connect((store) => {
  return {
    messages: store.messages.messages,
    notifications: store.notifications.notifications,
  };
})
export default class NavbarTopLinks extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchMessages())
    }

    /* 
    *   @desc - returns the number of new messages/notifications
    *   @param array - array of notifications or of messages
    *           each notification/message has field 'new' that is true if it has never been displayed (icon has not been clicked)            
    *   this attribute is set to true when icon is clicked
    */
    countNew(array){
        return array.map(ele => ele.new).filter(b=>b).length
    }


    /* 
    *   @returns - number of new messages
    */
    numberNewMessages(){
        return this.countNew(this.props.messages)
    }

    /* 
    *   @returns - number of new notifications
    */
    numberNewNotifications(){
        return this.countNew(this.props.notifications)
    }
    

    /* 
    *   @desc - this functions are called when a icon is clicked.
    *       all notifications/messages will be marked as !new, 
    *       the badge will then be hidden
    */

    clearMessagesBadge(){
        this.props.dispatch(setMessagesNotNew())
    }

    clearNotificationsBadge(){
        this.props.dispatch(setNotificationsNotNew())
    }


    /* 
    *   @desc - open the message in the chat
    */

    openMessage(messageId){
        this.props.dispatch(openMessage(messageId))
    }

    render() {

        return (
            <ul class="nav navbar-top-links navbar-right">

                <SearchLink />

                <MessagesLink messages={this.props.messages} nNew={this.numberNewMessages()} clearBadge={this.clearMessagesBadge.bind(this)} markAsSeen={this.openMessage.bind(this)} />

                <NotificationsLink notifications={this.props.notifications} nNew={this.numberNewNotifications()} clearBadge={this.clearNotificationsBadge.bind(this)} />

                <UserAvatarLink />

            </ul>
        )
    }
}
