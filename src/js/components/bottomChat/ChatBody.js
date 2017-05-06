import React from "react"

import MyMessage from "./MyMessage"
import SenderMessage from "./SenderMessage"

export default class ChatBody extends React.Component {

	scrollBottom(){
    	this.refs.chatBody.scrollTop = this.refs.chatBody.scrollHeight
	}

    componentDidUpdate(){
    	this.scrollBottom()
    }

    componentDidMount(){
    	this.scrollBottom()
    }

    renderMessage(message, i){
    	if (message.author == this.props.message.tipster.name)
    		return <SenderMessage key={i} {...message} img={this.props.message.tipster.avatar}/>
    	else
    		return <MyMessage key={i} {...message} />
    }

    render() {

    	const { message, height } = this.props

    	const messages = message.messages.slice().reverse().map((message,i) => this.renderMessage(message, i))

        return (            
            <div class="panel-body" ref="chatBody" style={{"height":height+"px"}}>
            	{messages}
            </div>
        )
    }
}
