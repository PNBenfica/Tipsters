import React from "react"
import { connect } from "react-redux";

import { fetchMessages, setMessagesNotNew, openMessage, newMessage } from "../../../../actions/messagesActions";
import { setNotificationsNotNew } from "../../../../actions/notificationsActions";

import MessagesLink from "./messages/MessagesLink"
import NotificationsLink from "./notifications/NotificationsLink"
import SearchLink from "./search/SearchLink"
import UserAvatarLink from "./user/UserAvatarLink"


@connect((store) => {
  return {
    messages: store.messages.messages,
    notifications: store.notifications.notifications,
  };
})
export default class NavbarActions extends React.Component {

    constructor(args){
        super(...args)
        this.state = {
            open: ""
        }
    }

    componentWillMount() {
        this.fetchMessages()
        const fetchMessages = setInterval(this.fetchMessages.bind(this), 1000000)
        this.setState( { fetchMessages } )
    }

    componentWillUnmount() {
        clearInterval(this.state.fetchMessages)
    }

    fetchMessages(){
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

    /* 
    *   @desc - create new message in the chat
    */
    createNewMessage(){
        this.props.dispatch(newMessage())
    }

    setOpenSidebar(open, callback){
        this.setState({ open }, callback)
    }

    onLinkClick(newLink){
        let { open } = this.state
        if (open === "")
            this.setOpenSidebar(newLink)
        else if (open === newLink)
            this.setOpenSidebar("")
        else{
            this.setOpenSidebar("", () => setTimeout(() => this.setOpenSidebar(newLink), 1000))
        }
    }

    onMessagesClick(){
        this.onLinkClick("messages")
        this.clearMessagesBadge()
    }

    onNotificationsClick(){
        this.onLinkClick("notifications")
        this.clearNotificationsBadge()
    }

    render() {

        const { open } = this.state

        return (
            <div class="navbar-actions">

                <SearchLink onClick={this.onLinkClick.bind(this, "search")} open={open==="search"} />

                <MessagesLink messages={this.props.messages} nNew={this.numberNewMessages()} onClick={this.onMessagesClick.bind(this)} open={open==="messages"}  markAsSeen={this.openMessage.bind(this)} createNewMessage={this.createNewMessage.bind(this)}/>

                <NotificationsLink notifications={this.props.notifications} nNew={this.numberNewNotifications()} onClick={this.onNotificationsClick.bind(this)} open={open==="notifications"} />

                <UserAvatarLink onClick={this.onLinkClick.bind(this, "settings")} open={open==="settings"} />

            </div>
        )
    }
}
