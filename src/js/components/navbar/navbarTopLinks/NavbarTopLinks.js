import React from "react"
import { connect } from "react-redux";

import { setNotificationsNotNew } from "../../../actions/notificationsActions";

import MessagesLink from "./MessagesLink"
import NotificationsLink from "./NotificationsLink"
import SearchLink from "./SearchLink"
import UserAvatarLink from "./UserAvatarLink"


@connect((store) => {
  return {
    notifications: store.notifications.notifications,
  };
})
export default class NavbarTopLinks extends React.Component {


    clearNotificationsBadge(){
        this.props.dispatch(setNotificationsNotNew())
    }

    constructor(...args) {
        super(...args)
        this.state = { 
            messages : [
                { id: 1, date : "15:11", sender : "John Smith", senderImage : "img/joaoalmeida.jpg", content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...", seen : false, new : true},
                { id: 2, date : "13:53", sender : "Paulo Teixeira", senderImage : "img/pauloteixeira.jpg", content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...", seen : false, new : true},
                { id: 3, date : "Ter", sender : "John Smith", senderImage : "img/joaoalmeida.jpg", content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...", seen : true, new : false}]
            }
    }


    markAsSeen(array, id){
        const ele = array.filter(ele => ele.id==id)[0]
        ele.seen = true
        this.setState({array})
    }

    markMessageAsSeen(messageId){
        this.markAsSeen(this.state.messages, messageId)
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
        return this.countNew(this.state.messages)
    }

    /* 
    *   @returns - number of new notifications
    */
    numberNewNotifications(){
        return this.countNew(this.props.notifications)
    }
    

    /* 
    *   @desc - this function is called when a icon is clicked.
    *       all notifications/messages will be marked as !new, 
    *       the badge will then be hidden
    */
    clearBadge(array){
        array.forEach(ele => ele.new=false)
        this.setState({array})
    }

    clearMessagesBadge(){
        this.clearBadge(this.state.messages)
    }


    render() {

        return (
            <ul class="nav navbar-top-links navbar-right">

                <SearchLink />

                <MessagesLink messages={this.state.messages} nNew={this.numberNewMessages()} clearBadge={this.clearMessagesBadge.bind(this)} markAsSeen={this.markMessageAsSeen.bind(this)} />

                <NotificationsLink notifications={this.props.notifications} nNew={this.numberNewNotifications()} clearBadge={this.clearNotificationsBadge.bind(this)} />

                <UserAvatarLink />

            </ul>
        )
    }
}
