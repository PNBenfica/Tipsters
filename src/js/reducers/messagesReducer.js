export default function reducer(state={
        messages : [],
        openMessagesIds : [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_MESSAGES_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_MESSAGES_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_MESSAGES_FULFILLED": {
            let { messages } = action.payload
            messages.forEach(message => message.id = message.tipster.name)

            return {
                ...state,
                fetching: false,
                fetched: true,
                messages
            }
        }
        case "SET_MESSAGES_NOT_NEW_PENDING": {
            let messages = [...state.messages]
            messages.forEach(ele => ele.new=false)
            return {
                ...state,
                messages: messages,
            }
        }
        case "NEW_MESSAGE": {
            let openMessagesIds = [...state.openMessagesIds]
            let messages = [...state.messages]
            if (action.payload){
                const destUser = action.payload

                const id = destUser
                console.log(messages)
                if (!messages.map(m=>m.id).includes(destUser)){
                    messages = [{id: id, "tipster": {"avatar": "img/user6.jpg", "name": destUser} , messages : [], seen : true, new : false}, ...messages]
                }
                else if(!openMessagesIds.includes(destUser)) {
                    openMessagesIds = [id, ...openMessagesIds]
                    openMessagesIds = openMessagesIds.filter(id => id != "NEW_MESSAGE")
                }
            }
            else if(!openMessagesIds.includes("NEW_MESSAGE")) {
                openMessagesIds = [ "NEW_MESSAGE" , ...openMessagesIds]
            }

            return {
                ...state,
                openMessagesIds,
                messages
            }
        }
        case "MARK_MESSAGE_AS_SEEN_PENDING": {
            const messages = [...state.messages]
            const messageId = action.params
            const messageToUpdate = messages.findIndex(message => message.id === messageId)
            messages[messageToUpdate] = Object.assign({}, messages[messageToUpdate], {"seen":true});

            return {
                ...state,
                messages: messages,
            }
        }
        case "OPEN_MESSAGE_PENDING": {
            const messages = [...state.messages]
            const messageId = action.params
            const messageToUpdate = messages.findIndex(message => message.id === messageId)
            messages[messageToUpdate] = Object.assign({}, messages[messageToUpdate], {"seen":true});
            const openMessagesIds = [...state.openMessagesIds, messageId]  

            return {
                ...state,
                messages: messages,
                openMessagesIds : openMessagesIds
            }
        }
        case "CLOSE_MESSAGE":{
            const openMessagesIds = state.openMessagesIds.filter(id => id != action.payload)
            return {
                ...state,
                openMessagesIds : openMessagesIds
            }
        }
        case "SEND_MESSAGE_PENDING":{
            const newMessage = {author:"Paulo Teixeira", content: action.params.message, date: "just now" }
            const messages = [...state.messages]
            const index = messages.findIndex(message => message.id === action.params.username)
            messages[index] = Object.assign({}, messages[index], {"messages": [newMessage, ...messages[index].messages]})
            return {
                ...state,
                messages: messages
            }
        }
    }

    return state
}
