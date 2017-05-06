import React from "react"
import ReactDOM from "react-dom"

import ChatInput from "./ChatInput"
import ChatBody from "./ChatBody"
import Header from "./header/Header"

export default class ChatPanel extends React.Component {

    componentDidUpdate(prevProps, prevState){

        if (prevProps.message.id != this.props.message.id && (prevProps.in) != (this.props.in) ){
            const panel = ReactDOM.findDOMNode(this.refs.panelCollapse)
            if (prevProps.in){
                panel.className = panel.className.replace("in", "")
                panel.className = panel.className.replace("ni", "")
            }
            else{
                panel.className += " ni"
            }
                
        }
    }

    toggle(){
        const panel = ReactDOM.findDOMNode(this.refs.panelCollapse)
        if ( panel.className.includes("ni") ){
            panel.className = panel.className.replace("ni", "")
        }
        else{
            this.props.toggle()
        }
    }

    getBodyHeights(){
        let bodyHeight = 245, inputHeight = 35
        const inputLength = this.props.textInput.length

        if (inputLength > 63){
            bodyHeight = 200; inputHeight = 80
        }
        else if (inputLength > 42){
            bodyHeight = 215; inputHeight = 65
        }
        else if (inputLength > 21){
            bodyHeight = 230; inputHeight = 50
        }

        return { bodyHeight, inputHeight }
    }

    render() {

        const { message, close, onInputChange, sendMessage, textInput } = this.props
        const chat_id = 'chat_msg_' + message.id

        const { bodyHeight, inputHeight } = this.getBodyHeights()

        return (
            <div class="chat-panel-message">
                <div class="panel-group">
                    <div class="panel panel-default">

                        <Header title={message.tipster.name} href={"#" + chat_id} toggle={this.toggle.bind(this)} close={close}/>
                        
                        <div id={chat_id} class="panel-collapse collapse in" ref="panelCollapse">
                            <ChatBody height={bodyHeight} message={message} />
                            <ChatInput value={textInput} height={inputHeight} sendMessage={sendMessage} onInputChange={onInputChange}/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
