import React from "react"
import { connect } from "react-redux";
import { closeMessage, sendMessage, newMessage } from "../../actions/messagesActions";

import ChatPanel from "./ChatPanel"
import NewMessagePanel from "./NewMessagePanel"
import HiddenMessagesPanel from "./hiddenmesssages/HiddenMessagesPanel"

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
        if (newOpen.length > 0 && !this.state.open.map(ele=>ele.id).includes(newOpen[0]) ){
            open = [{id: newOpen[0], _in:true}, ...this.state.open]
        }
        else{
            const toRemove = this.props.openMessagesIds.filter(id => !nextProps.openMessagesIds.includes(id))
            open = this.state.open.filter(ele => ele.id != toRemove[0])
        }
        this.setState( {open} )
    }

    componentWillMount(){
        this.updateDimensions()

        const open = this.props.openMessagesIds.map(id => {return {id, _in:true} } )
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
    *   @desc creates a new message to 'destination'. called after destination is selected in newmessagepanel
    *   @param destination - name of the user to send a message
    */
    createNewMessage(destination){
        const messageIndex = this.props.messages.findIndex(message => message.sender === destination)
        if (messageIndex != -1 && this.isOpen(this.props.messages[messageIndex])) {
            let open = [...this.state.open]
            const index = open.findIndex(ele => ele.id === this.props.messages[messageIndex].id)
            for(let i = index; i > 0; i--){
                this.swap(open, i, i - 1)
            }
            this.setState( {open}, () => this.closeMessage("NEW_MESSAGE"))
        }

        else
            this.props.dispatch(newMessage(destination))
    }

    /*
    */
    toggleMessage(messageId){
        let open = [...this.state.open]
        const index = open.findIndex(ele => ele.id === messageId)
        open[index]._in = !open[index]._in;
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


    swap(array, x, y){
        const temp = array[y];
        array[y] = array[x];
        array[x] = temp;
    }

    openHiddenMessage(messageId){
        let open = [...this.state.open]
        const index = open.findIndex(ele => ele.id === messageId)
        for(let i = index; i > this.state.nVisibleMessages - 1; i--){
            this.swap(open, i, i - 1)
        }
        this.setState( {open} )
    }

    renderMessagePanel(message, i){
        const index = this.state.open.findIndex(ele => ele.id === message.id)
        const _in = this.state.open[index]._in;
        return <ChatPanel key={i} message={message} textInput={this.getInputText(message.id)} sendMessage={this.sendMessage.bind(this, message.id)} onInputChange={this.onInputChange.bind(this, message.id)} in={_in} toggle={this.toggleMessage.bind(this, message.id)} close={this.closeMessage.bind(this, message.id)}/>
    }

    renderNewMessagePanel(){
        if (this.props.openMessagesIds.includes("NEW_MESSAGE")) 
            return <NewMessagePanel createNewMessage={this.createNewMessage.bind(this)} close={this.closeMessage.bind(this, "NEW_MESSAGE")} />
    }

    render() {
        const messages = this.getOpenMessages()
        let sortedMessages = messages.sort((msg1,msg2) => this.state.open.findIndex(m => m.id == msg1.id) - this.state.open.findIndex(m => m.id == msg2.id) )
        const creatingNewMessage = this.props.openMessagesIds.includes("NEW_MESSAGE")
        const visibleMessages = sortedMessages.slice(0, this.state.nVisibleMessages - 1 * creatingNewMessage)
        const nInvisibleMessages = messages.length - visibleMessages.length

        return (
            <div id="bottom-chat">
                {this.renderNewMessagePanel() }
                {visibleMessages.map((message, i) => this.renderMessagePanel(message, i))}
                { nInvisibleMessages > 0 ? <HiddenMessagesPanel hiddenMessages={sortedMessages.slice(this.state.nVisibleMessages - 1 * creatingNewMessage)} openHiddenMessage={this.openHiddenMessage.bind(this)}/>: "" }
            </div>
        )
    }
}
