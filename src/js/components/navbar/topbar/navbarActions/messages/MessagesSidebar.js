import React from "react"
import classNames from "classnames"

import MessageItem from "./MessageItem"
import MessagesSidebarHeader from "./MessagesSidebarHeader"

export default class MessagesSidebar extends React.Component {

    renderMessageItem(message, i){
        return message.messages.length > 0?
            <MessageItem key={i} {...message} markAsSeen={this.props.markAsSeen} /> : ""
    }

    render() {

        const { messages, open, createNewMessage } = this.props

        const Messages = this.props.messages.map(this.renderMessageItem.bind(this))

            
        return (
            <div class={classNames("sidebar-right", { open } )}>

                <MessagesSidebarHeader createNewMessage={createNewMessage}/>

                <ul>
                    {Messages}
                </ul>

            </div>
        )
    }
}
