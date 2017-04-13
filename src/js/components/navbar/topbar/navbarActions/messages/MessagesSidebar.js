import React from "react"
import classNames from "classnames"

import EmptyMessages from "./EmptyMessages"
import MessageItem from "./MessageItem"
import SidebarHeader from "./SidebarHeader"
import SideBar from "./../SideBar"

export default class MessagesSidebar extends React.Component {

    renderMessageItem(message, i){
        return message.messages.length > 0?
            <MessageItem key={i} {...message} markAsSeen={this.props.markAsSeen} /> : ""
    }

    render() {

        let { close, createNewMessage, messages, open, } = this.props

        if (messages.length > 0){
            messages = messages.map(this.renderMessageItem.bind(this))
        }
        else{
            messages = <EmptyMessages />
        }

        return (
            <SideBar open={open} close={close}>

                <SidebarHeader createNewMessage={createNewMessage}/>

                <ul>
                    {messages}
                </ul>

            </SideBar>
        )
    }
}
