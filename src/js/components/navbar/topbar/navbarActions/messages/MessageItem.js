import React from "react"

import DropdownItem from "./../DropdownItem"
import Time from "./Time"

export default class MessageItem extends React.Component {

    render() {

        const { id, messages, sender , senderImage , seen, markAsSeen } = this.props
        return (
            <DropdownItem id={id} img={senderImage} highlighted={!seen} markAsSeen={markAsSeen}>

                <div class="content">

                    <h3>{sender}</h3>

                    <span class="pull-right time">
                        <i class="fa fa-clock-o fa-fw"></i>
                        <em>{messages[0].date}</em>
                    </span>

                    <p>{messages[0].content.substring(0,65)}</p>
                </div>
                
            </DropdownItem>
        )
    }
}
