export function fetchNotifications() {
    return {
        type: "FETCH_NOTIFICATIONS_FULFILLED"
    }
}

export function setNotificationsNotNew() {
    return {
        type: 'SET_NOTIFICATIONS_NOT_NEW',
    }
}

export function markAsSeen(notificationId) {
    return {
        type: 'MARK_AS_SEEN',
        payload: notificationId,
    }
}
