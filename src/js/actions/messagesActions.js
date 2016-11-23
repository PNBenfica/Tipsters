export function fetchMessages() {
    return {
        type: "FETCH_MESSAGES_FULFILLED"
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

export function newMessage() {
    return {
        type: 'NEW_MESSAGE'
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