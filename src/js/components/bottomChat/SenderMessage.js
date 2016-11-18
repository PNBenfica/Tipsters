import React from "react"

export default class SenderMessage extends React.Component {

    render() {

    	const { author, date, content, img } = this.props

        return (            
			<div class="chat-message sender-chat-message">
				<span>{date}</span>
				<div class="media">
					<a class="media-left" href="#">
						<img class="media-object" src={img}/>
					</a>
					<div class="media-body">
						<p>{content}</p>
					</div>
				</div>
			</div>
        )
    }
}
