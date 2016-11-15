export default function reducer(state={
        notifications : [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_NOTIFICATIONS": {
            return {...state, fetching: true}
        }
        case "FETCH_NOTIFICATIONS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_NOTIFICATIONS_FULFILLED": {
            let notifications = [...state.notifications]
            if (notifications.length == 0)
                notifications = [
                    { id: 4, date : "15:11", type : "fa-comment", tipsterImage : "img/joaoalmeida.jpg", tipsterName : "John Smith", content : "e 3 outras pessoas comentaram a tua tip", seen:false, new: true},
                    { id: 5, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:false, new: true},
                    { id: 6, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:false, new: true},
                    { id: 7, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:false, new: true},
                    { id: 8, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:true, new:false},
                    { id: 9, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:true, new:false},
                    { id: 10, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:true, new:false},
                    { id: 11, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:true, new:false},
                    { id: 12, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:false, new:false},
                    { id: 13, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:true, new:false},
                    { id: 14, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:false, new:false},
                    { id: 15, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:true, new:false},
                    { id: 16, date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te", seen:true, new:false},
                    { id: 17, date : "15:11", type : "fa-thumbs-up", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "gostou da tua tip", seen:true, new:false}]
            return {
                ...state,
                fetching: false,
                fetched: true,
                notifications: notifications,
            }
        }
        case "SET_NOTIFICATIONS_NOT_NEW": {
            let notifications = [...state.notifications]
            notifications.forEach(ele => ele.new=false)
            return {
                ...state,
                notifications: notifications,
            }
        }
        case "MARK_AS_SEEN": {
            const notifications = [...state.notifications]
            const notificationToUpdate = notifications.findIndex(notification => notification.id === action.payload)
            notifications[notificationToUpdate] = Object.assign({}, notifications[notificationToUpdate], {"seen":true});

            return {
                ...state,
                notifications: notifications,
            }
        }
    }

    return state
}
