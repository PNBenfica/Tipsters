import React from "react"
import { connect } from "react-redux";
import { closeMessage, sendMessage } from "../../actions/messagesActions";

import ChatPanel from "./ChatPanel"
import HiddenMessagesPanel from "./HiddenMessagesPanel"

@connect((store) => {
  return {
    messages: store.messages.messages,
    openMessagesIds: store.messages.openMessagesIds,
  };
})
export default class BottomChatContainer extends React.Component {

    constructor(...args) {
        super(...args)
        this.state = {nVisibleMessages: 1, open: [], texts: [] }
    }

    getWindowWidth(){
        return Math.max(document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"])
    }

    updateDimensions(){
        const width = this.getWindowWidth()
        console.log(width)

        let nVisibleMessages = 0
        if (width < 655) nVisibleMessages = 1
        else if (width < 906) nVisibleMessages = 2
        else if (width < 1180) nVisibleMessages = 3
        else nVisibleMessages = 4

        if (nVisibleMessages != this.state.nVisibleMessages)
            this.setState({ nVisibleMessages })
    }

    componentWillReceiveProps(nextProps){
        const newOpen = nextProps.openMessagesIds.filter(id => !this.props.openMessagesIds.includes(id))
        let open = []
        if (newOpen.length > 0 && !this.state.open.includes(newOpen[0]) ) 
            open = [...this.state.open, ...newOpen]
        else{
            const toRemove = this.props.openMessagesIds.filter(id => !nextProps.openMessagesIds.includes(id))
            console.log(toRemove)
            open = this.state.open.filter(msgId => msgId != toRemove[0])
        }
        console.log( open )
        this.setState( {open} )
    }

    componentWillMount(){
        this.updateDimensions()

        const open = [...this.props.openMessagesIds]
        this.setState({ open })
    }
    componentDidMount(){
        window.addEventListener("resize", this.updateDimensions.bind(this))
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions.bind(this))
    }


    /*
    *   @desc - returns true if the message is open in the chat
    */
    isOpen(message){
        return this.props.openMessagesIds.includes(message.id)
    }

    /*
    *   @return a array of objects with the messages opened in the chat
    */
    getOpenMessages(){
        return this.props.messages.filter(this.isOpen.bind(this))
    }

    /*
    *   @desc removes a message that is opened from the chat
    *   @param messageId - message id of the message to be removed
    */
    closeMessage(messageId){
        this.props.dispatch(closeMessage(messageId))
    }

    /*
    */
    toggleMessage(messageId){
        let open = [...this.state.open]
        if (open.includes(messageId))
            open = open.filter(id => id != messageId)
        else
            open = [...open, messageId]
        this.setState({ open })
    }


    onInputChange(messageId, text){
        let texts = [...this.state.texts]
        const index = texts.findIndex(msg => msg.id === messageId)
        if (index == -1)
            texts = [...texts, {id:messageId, text: text}]
        else
            texts[index].text = text
        this.setState({ texts })
    }

    getInputText(messageId){
        const index = this.state.texts.findIndex(msg => msg.id === messageId)
        return (index != -1) ? this.state.texts[index].text : ""
    }

    sendMessage(messageId, text){
        this.onInputChange(messageId, "")
        this.props.dispatch(sendMessage(messageId, text))
    }

    render() {
        console.log(this.state.texts)
        const messages = this.getOpenMessages()
        const visibleMessages = messages.slice(0, this.state.nVisibleMessages).sort((msg1,msg2) => this.props.openMessagesIds.findIndex(i => i == msg1.id) - this.props.openMessagesIds.findIndex(i => i == msg2.id) )
        const nInvisibleMessages = messages.length - visibleMessages.length

        return (
            <div id="bottom-chat">
                {visibleMessages.map((message, i) => <ChatPanel key={i} message={message} textInput={this.getInputText(message.id)} sendMessage={this.sendMessage.bind(this, message.id)} onInputChange={this.onInputChange.bind(this, message.id)} in={this.state.open} toggle={this.toggleMessage.bind(this, message.id)} close={this.closeMessage.bind(this, message.id)}/>)}
                { nInvisibleMessages > 0 ? <HiddenMessagesPanel hiddenMessages={messages.slice(this.state.nVisibleMessages)}/>: "" }
            </div>
        )
    }
}
