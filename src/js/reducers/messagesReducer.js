export default function reducer(state={
        messages : [],
        openMessagesIds : [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_MESSAGES": {
            return {...state, fetching: true}
        }
        case "FETCH_MESSAGES_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_MESSAGES_FULFILLED": {
            let messages = [...state.messages]
            let openMessagesIds = [...state.openMessagesIds]

            if (messages.length == 0){
                messages = [
                    { id: 1, sender : "John Smith", senderImage : "img/joaoalmeida.jpg", messages : [ {content:"Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"11:34", author:"John Smith"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"John Smith"}] , seen : false, new : true},
                    { id: 2, sender : "Paulo Teixeira", senderImage : "img/pauloteixeira.jpg", messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"10:32", author:"Paulo Teixeira"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : false, new : true},
                    { id: 3, sender : "Rui Silva", senderImage : "img/joaoalmeida.jpg", messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"9:20", author:"Rui Silva"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Rui Silva"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : true, new : false},
                    { id: 4, sender : "Carlos Silva", senderImage : "img/joaoalmeida.jpg", messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"9:20", author:"Rui Silva"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Rui Silva"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : true, new : false},
                    { id: 5, sender : "Silvia Silva", senderImage : "img/joaoalmeida.jpg", messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"9:20", author:"Rui Silva"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Rui Silva"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : true, new : false},
                    { id: 6, sender : "Gonçalo Silva", senderImage : "img/joaoalmeida.jpg", messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"9:20", author:"Rui Silva"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Rui Silva"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : true, new : false}]
                openMessagesIds = [1,3]
            }
            return {
                ...state,
                fetching: false,
                fetched: true,
                messages: messages,
                openMessagesIds: openMessagesIds
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
            if (openMessagesIds.includes("NEW_MESSAGE")){
                const destUser = action.payload

                const id = Math.floor((Math.random() * 10000) + 10)
                messages = [{id: id, sender: destUser, senderImage : "img/joaoalmeida.jpg", messages : [], seen : true, new : false}, ...messages]
                openMessagesIds = [id, ...openMessagesIds]
                openMessagesIds = openMessagesIds.filter(id => id != "NEW_MESSAGE")
            }
            else{
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
