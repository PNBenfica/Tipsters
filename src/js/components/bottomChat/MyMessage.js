import React from "react"

export default class MyMessage extends React.Component {

    render() {

    	const { date, content } = this.props

        return (            
            <div class="chat-message my-chat-message">
                <span>{date}</span>
            	<p>{content}</p>
            </div>
        )
    }
}
