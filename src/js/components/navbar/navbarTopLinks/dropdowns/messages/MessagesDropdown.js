import React from "react"

import MessageItem from "./MessageItem"
import NewMessageLi from "./NewMessageLi"

export default class MessagesDropdown extends React.Component {

    render() {

        const Messages = this.props.messages.map((message, i) => <MessageItem key={i} {...message} markAsSeen={this.props.markAsSeen}/> )

        return (
            <ul class="dropdown-menu dropdown-messages col-xs-12">
                
                <div class="dropdown-content-container">
                    {Messages}
                </div>


                <NewMessageLi />
            </ul>
        )
    }
}
