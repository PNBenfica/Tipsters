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
            let { notifications } = action.payload

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
