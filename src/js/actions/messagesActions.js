import { callAPI } from '../scripts/gapi'

export function fetchMessages() {

    return function(dispatch) {

        callAPI({
            type: "FETCH_MESSAGES",
            request: (() => gapi.client.tipsters.fetchMessages()),
            dispatch,
            default: fetchMessages_default()
        })

    }
}


function fetchMessages_default(){
    return {
        messages:[
            { id: 1, tipster : {name: "John Smith", avatar : "img/joaoalmeida.jpg"} , messages : [ {content:"Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"11:34", author:"John Smith"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"John Smith"}] , seen : false, new : true},
            { id: 2, tipster : {name: "Paulo Teixeira", avatar : "img/pauloteixeira.jpg"} , messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"10:32", author:"Paulo Teixeira"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : false, new : true},
            { id: 3, tipster : {name: "Rui Silva", avatar : "img/joaoalmeida.jpg"} , messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"9:20", author:"Rui Silva"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Rui Silva"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : true, new : false},
            { id: 4, tipster : {name: "Carlos Silva", avatar : "img/joaoalmeida.jpg"} , messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"9:20", author:"Rui Silva"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Rui Silva"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : true, new : false},
            { id: 5, tipster : {name: "Silvia Silva", avatar : "img/joaoalmeida.jpg"} , messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"9:20", author:"Rui Silva"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Rui Silva"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : true, new : false},
            { id: 6, tipster : {name: "Gonçalo Silva", avatar : "img/joaoalmeida.jpg"} , messages : [ {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"9:20", author:"Rui Silva"},{content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Rui Silva"}, {content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...",date:"12:34", author:"Paulo Teixeira"}] , seen : true, new : false}]
    }
}

export function setMessagesNotNew() {
    return {
        type: 'SET_MESSAGES_NOT_NEW',
    }
}

export function openMessage(messageId) {
    return {
        type: 'OPEN_MESSAGE',
        payload: messageId,
    }
}

export function newMessage(destination) {
    return {
        type: 'NEW_MESSAGE',
        payload: destination
    }
}

export function closeMessage(messageId) {
    return {
        type: 'CLOSE_MESSAGE',
        payload: messageId,
    }
}

export function sendMessage(messageId, content) {
    return {
        type: 'SEND_MESSAGE',
        payload: {id: messageId, content: content},
    }
}