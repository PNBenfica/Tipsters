import React from "react"
import classNames from "classnames"

import MessageItem from "./MessageItem"
import NewMessageLi from "./NewMessageLi"

export default class MessagesSidebar extends React.Component {

    renderMessageItem(message, i){
        return message.messages.length > 0?
            <MessageItem key={i} {...message} markAsSeen={this.props.markAsSeen} /> : ""
    }
// <ul class="dropdown-menu dropdown-messages col-xs-12">
                
//                 <div class="dropdown-content-container">
//                     {Messages}
//                 </div>

//                 <NewMessageLi createNewMessage={this.props.createNewMessage}/>
//             </ul>
    render() {

        const { messages, open, createNewMessage } = this.props

        const Messages = this.props.messages.map(this.renderMessageItem.bind(this))

            
        return (
            <div class={classNames("sidebar-right", { open } )}>

                <header>
                    <i class="fa fa-fw fa-envelope-o"></i>
                    <h2>Messages</h2>
                    <a class="fa fa-plus new-message" onClick={createNewMessage}></a>
                </header>

                <ul>
                    {Messages}
                </ul>

            </div>
        )
    }
}
