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

        let { messages, open, createNewMessage } = this.props

        if (messages.length > 0){
            messages = messages.map(this.renderMessageItem.bind(this))
        }
        else{
            messages = <EmptyMessages />
        }

        return (
            <SideBar open={open}>

                <SidebarHeader createNewMessage={createNewMessage}/>

                <ul>
                    {messages}
                </ul>

            </SideBar>
        )
    }
}
