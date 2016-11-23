import React from "react"

import DropdownIcon from "./DropdownIcon"
import MessagesDropdown from "./dropdowns/messages/MessagesDropdown"

export default class MessagesLink extends React.Component {

    render() {

        const { messages, nNew, clearBadge, markAsSeen, createNewMessage } = this.props

        return (
            <li class="dropdown">

                <DropdownIcon icon="fa-envelope-o" badge="badge-red"  newItems={nNew} clearBadge={clearBadge}/>

                <MessagesDropdown messages={messages} markAsSeen={markAsSeen} createNewMessage={createNewMessage}/>

            </li>
        )
    }
}
