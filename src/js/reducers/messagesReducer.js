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

            return {
                ...state,
                fetching: false,
                fetched: true,
                messages
            }
        }
        case "SET_MESSAGES_NOT_NEW": {
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

                const id = Math.floor((Math.random() * 10000) + 10)
                messages = [{id: id, sender: destUser, senderImage : "img/joaoalmeida.jpg", messages : [], seen : true, new : false}, ...messages]
                openMessagesIds = [id, ...openMessagesIds]
                openMessagesIds = openMessagesIds.filter(id => id != "NEW_MESSAGE")
            }
            else if(!openMessagesIds.includes("NEW_MESSAGE")) {
                openMessagesIds = [ "NEW_MESSAGE" , ...openMessagesIds]
            }

            return {
                ...state,
                openMessagesIds : openMessagesIds,
                messages : messages
            }
        }
        case "OPEN_MESSAGE": {
            const messages = [...state.messages]
            const messageToUpdate = messages.findIndex(message => message.id === action.payload)
            messages[messageToUpdate] = Object.assign({}, messages[messageToUpdate], {"seen":true});
            const openMessagesIds = [...state.openMessagesIds, action.payload]  

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
        case "SEND_MESSAGE":{
            const newMessage = {author:"Paulo Teixeira", content: action.payload.content, date: "just now" }
            const messages = [...state.messages]
            const index = messages.findIndex(message => message.id === action.payload.id)
            messages[index] = Object.assign({}, messages[index], {"messages": [newMessage, ...messages[index].messages]})
            return {
                ...state,
                messages: messages
            }
        }
    }

    return state
}
