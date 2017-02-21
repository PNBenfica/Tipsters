import React from "react"

import DropdownIcon from "./DropdownIcon"
import MessagesDropdown from "./dropdowns/messages/MessagesDropdown"

export default class MessagesLink extends React.Component {

    render() {

        const { messages, nNew, open, onClick, markAsSeen, createNewMessage } = this.props

        return (
            <div class="link" onClick={() => onClick()}>

                <DropdownIcon icon="fa-envelope-o" badge="badge-red"  newItems={nNew}/>

                <MessagesDropdown messages={messages} open={open} markAsSeen={markAsSeen} createNewMessage={createNewMessage}/>

            </div>
        )
    }
}
