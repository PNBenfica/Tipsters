import React from "react"
import {Media} from "react-bootstrap"

import DropdownItem from "./../DropdownItem"
import Time from "./Time"

export default class MessageItem extends React.Component {

    render() {

        const { id, messages, sender , senderImage , seen, markAsSeen } = this.props
        return (
            <DropdownItem id={id} img={senderImage} highlighted={!seen} markAsSeen={markAsSeen}>
                
                <h5 class="media-heading">
                    <strong>{sender}</strong>
                    <Time date={messages[0].date} />
                </h5>
                {messages[0].content.substring(0,75)}

            </DropdownItem>
        )
    }
}
