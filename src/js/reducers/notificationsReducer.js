export default function reducer(state={
        notifications : [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_NOTIFICATIONS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_NOTIFICATIONS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_NOTIFICATIONS_FULFILLED": {
            let { notifications = [] } = action.payload

            return {
                ...state,
                fetching: false,
                fetched: true,
                notifications: notifications,
            }
        }
        case "SET_NOTIFICATIONS_NOT_NEW_PENDING": {
            let notifications = [...state.notifications]
            notifications.forEach(ele => ele.new=false)
            return {
                ...state,
                notifications: notifications,
            }
        }
        case "MARK_AS_SEEN_PENDING": {
            const notification_key = action.params.notification_key
            const notifications = [...state.notifications]
            const notificationToUpdate = notifications.findIndex(notification => notification.id === notification_key)
            notifications[notificationToUpdate] = Object.assign({}, notifications[notificationToUpdate], {"seen":true});

            return {
                ...state,
                notifications: notifications,
            }
        }
    }

    return state
}
