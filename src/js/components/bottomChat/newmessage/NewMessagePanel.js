import React from "react"
import ReactDOM from "react-dom"

import Body from "./Body"
import Header from "./../header/Header"

export default class NewMessagePanel extends React.Component {

    render() {

        const { close, createNewMessage } = this.props

        const chat_id = 'chat_msg_new_message'

        return (
            <div class="chat-panel-message col-xs-10 col-sm-4 col-md-3 col-lg-2">
                <div class="panel-group">
                    <div class="panel panel-default">

                        <Header title={"New Message"} href={"#" + chat_id} close={close}/>
                        
                        <div id={chat_id} class="panel-collapse collapse in" >
                            <Body createNewMessage={createNewMessage} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
