import { callAPI } from '../scripts/gapi'

export function fetchNotifications() {

    return function(dispatch) {

        callAPI({
            type: "FETCH_NOTIFICATIONS",
            request: (() => gapi.client.tipsters.fetchNotifications()),
            dispatch,
            default: fetchNotifications_default()
        })

    }
}

function fetchNotifications_default(){
    return {
        notifications:
           [{ id: 4, date : "15:11", type : "COMMENT", tipster: {avatar: "img/joaoalmeida.jpg", name: "John Smith"}, post_id:"13456", content : "e 3 outras pessoas comentaram a tua tip", seen:false, new: true},
            { id: 5, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:false, new: true},
            { id: 6, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:false, new: true},
            { id: 7, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:false, new: true},
            { id: 8, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:true, new:false},
            { id: 9, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:true, new:false},
            { id: 10, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:true, new:false},
            { id: 11, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:true, new:false},
            { id: 12, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:false, new:false},
            { id: 13, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:true, new:false},
            { id: 14, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:false, new:false},
            { id: 15, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:true, new:false},
            { id: 16, date : "13:53", type : "FOLLOW", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, content : "começou a seguir-te", seen:true, new:false},
            { id: 17, date : "15:11", type : "LIKE", tipster: {avatar: "img/pauloteixeira.jpg", name: "John Smith"}, post_id:"13456", content : "gostou da tua tip", seen:true, new:false}]
    }
}

export function setNotificationsNotNew() {

    return function(dispatch) {

        callAPI({
            type: "SET_NOTIFICATIONS_NOT_NEW",
            request: (() => gapi.client.tipsters.resetNewNotificationsCount()),
            dispatch
        })

    }

}

export function markAsSeen(notification_key) {

    return function(dispatch) {

        callAPI({
            type: "MARK_AS_SEEN",
            request: (() => gapi.client.tipsters.markNotificationAsSeen({ notification_key })),
            dispatch, 
            action: { notification_key }
        })

    }

}
