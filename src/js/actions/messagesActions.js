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
    	"messages": [
			{"messages": [{"author": "Aimar Bernardo", "content": "ya concordo", "date": "2017-05-06 18:23:40"},{"author": "Otavio Preudhomme", "content": "nao sei se bate, talvez", "date": "2017-05-06 18:23:40"},{"author": "Aimar Bernardo", "content": "td bein?", "date": "2017-05-06 18:23:40"},{"author": "Otavio Preudhomme", "content": "bora bora", "date": "2017-05-06 18:23:40"},{"author": "Otavio Preudhomme", "content": "renato joga muito ya", "date": "2017-05-06 18:23:31"},{"author": "Aimar Bernardo", "content": "nao sei se bate, talvez", "date": "2017-05-06 18:23:31"},{"author": "Aimar Bernardo", "content": "Oi gata", "date": "2017-05-06 18:23:30"},{"author": "Otavio Preudhomme", "content": "partilha ai uma tip moleque", "date": "2017-05-06 18:23:30"},{"author": "Aimar Bernardo", "content": "partilha ai uma tip moleque", "date": "2017-05-06 18:23:30"}], "new": true, "seen": false, "tipster": {"avatar": "img/user6.jpg", "name": "Otavio Preudhomme"} },
			{"messages": [{"author": "Calado Diamantino", "content": "tenho que discordar neste caso", "date": "2017-05-06 18:23:36"},{"author": "Aimar Bernardo", "content": "es o maior", "date": "2017-05-06 18:23:36"},{"author": "Calado Diamantino", "content": "burro do crl perdi por sua causa", "date": "2017-05-06 18:23:36"},{"author": "Calado Diamantino", "content": "nao sei se bate, talvez", "date": "2017-05-06 18:23:28"},{"author": "Aimar Bernardo", "content": "partilha ai uma tip moleque", "date": "2017-05-06 18:23:28"},{"author": "Calado Diamantino", "content": "td bein?", "date": "2017-05-06 18:23:28"},{"author": "Calado Diamantino", "content": "es o maior", "date": "2017-05-06 18:23:27"},{"author": "Aimar Bernardo", "content": "renato joga muito ya", "date": "2017-05-06 18:7"} ], "new": true, "seen": false, "tipster": {"avatar": "img/user2.jpg", "name": "Calado Diamantino"} },
			{"messages": [{"author": "Kostas Lazar", "content": "partilha ai uma tip moleque", "date": "2017-05-06 18:23:32"},{"author": "Aimar Bernardo", "content": "tenho que discordar neste caso", "date": "2017-05-06 18:23:32"},{"author": "Kostas Lazar", "content": "partilha ai uma tip moleque", "date": "2017-05-06 18:23:32"},{"author": "Kostas Lazar", "content": "nao sei se bate, talvez", "date": "2017-05-06 18:23:31"},{"author": "Aimar Bernardo", "content": "partilha ai uma tip moleque", "date": "205-06 18:23:31"} ], "new": true, "seen": false, "tipster": {"avatar": "img/user2.jpg", "name": "Kostas Lazar"} },
			{"messages": [{"author": "Xandao Zahovic", "content": "renato joga muito ya", "date": "2017-05-06 18:23:26"},{"author": "Aimar Bernardo", "content": "bora bora", "date": "2017-05-06 18:23:26"},{"author": "Xandao Zahovic", "content": "tenho que discordar neste caso", "date": "2017-05-06 18:23:26"}], "new": true, "seen": false, "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic"} },
			{"messages": [{"author": "Aimar Bernardo", "content": "mensagem 2", "date": "2017-05-06 18:03:18"},{"author": "Aimar Bernardo", "content": "mensagem 2", "date": "2017-05-06 17:56:08"},{"author": "Aimar Bernardo", "content": "mensagem 2", "date": "2017-05-06 17:49:39"},{"author": "Aimar Bernardo", "content": "mensagem 2", "date": "2017-05-06 17:42:19"} ], "new": false,"seen": true, "tipster": { "avatar": "img/user5.jpg", "name": "Ederson Florentino" } }
		]
	}
}


export function setMessagesNotNew() {

    return function(dispatch) {

        callAPI({
            type: "SET_MESSAGES_NOT_NEW",
            request: (() => gapi.client.tipsters.resetNewMessagesCount()),
            dispatch
        })

    }

}

export function markMessageAsSeen(username) {

    return function(dispatch) {

        callAPI({
            type: "MARK_MESSAGE_AS_SEEN",
            request: (() => gapi.client.tipsters.markMessageAsSeen({username})),
            dispatch,
            action: username 
        })

    }
}

export function openMessage(username) {

    return function(dispatch) {

        callAPI({
            type: "OPEN_MESSAGE",
            request: (() => gapi.client.tipsters.markMessageAsSeen({username})),
            dispatch,
            action: username 
        })

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

export function sendMessage(username, message) {

    return function(dispatch) {

        callAPI({
            type: "SEND_MESSAGE",
            request: (() => gapi.client.tipsters.sendMessage({username,message})),
            dispatch,
            action: {username,message} 
        })

    }
}
