import React from "react"

export default class ListItem extends React.Component {

    render() {

        const { message, openHiddenMessage } = this.props

        return (
            <li class="list-group-item" onClick={() => openHiddenMessage(message.id)}>{message.sender.substring(0,18)}</li>
        )
    }
}
