import React from "react"
import {Media} from "react-bootstrap"

import DropdownItem from "./../DropdownItem"
import Time from "./Time"

export default class MessageItem extends React.Component {

    render() {

        const { id, date , sender , senderImage , content, seen, markAsSeen } = this.props

        return (
            <DropdownItem id={id} img={senderImage} highlighted={!seen} markAsSeen={markAsSeen}>
                
                <h5 class="media-heading">
                    <strong>{sender}</strong>
                    <Time date={date} />
                </h5>
                {content}

            </DropdownItem>
        )
    }
}
