import React from "react"

import Link from "./../Link"
import MessagesSidebar from "./MessagesSidebar"

export default class MessagesLink extends React.Component {

    render() {

        const { messages, nNew, open, onClick, markAsSeen, createNewMessage } = this.props

        return (
            <div class="link" onClick={() => onClick()}>

                <Link icon="fa-envelope-o" badge="badge-red"  newItems={nNew}/>

                <MessagesSidebar messages={messages} open={open} markAsSeen={markAsSeen} createNewMessage={createNewMessage}/>

            </div>
        )
    }
}
