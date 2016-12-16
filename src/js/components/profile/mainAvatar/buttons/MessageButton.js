import React from "react"
import { connect } from "react-redux"

import { newMessage } from "../../../../actions/messagesActions"

import Button from "./Button"

@connect()
export default class MessageButton extends React.Component {

	createNewMessage(){
		this.props.dispatch(newMessage("João Almeida"))
	}

    render() {

        return (
            <Button text={"Message"} icon={"fa fa-envelope"} onClick={this.createNewMessage.bind(this)} />
        )
    }
}
