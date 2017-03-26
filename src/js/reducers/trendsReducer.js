export default function reducer(state={
        users: [],
        events: [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_TRENDS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_TRENDS_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_TRENDS_FULFILLED": {
            const { users, events } = action.payload
            users.forEach(user => user.following = false)
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: users,
                events: events,
            }
        }
        case "FOLLOW_USER_PENDING": {
            const { username } = action.params
            const users = [...state.users]
            const userToUpdate = users.findIndex(user => user.tipster.name === username)
            users[userToUpdate] = Object.assign({}, users[userToUpdate], { following: !users[userToUpdate].following })

            return {
                ...state,
                users
            }
        }
        case "FOLLOW_USER_FULFILLED": {

        }
    }

    return state
}
