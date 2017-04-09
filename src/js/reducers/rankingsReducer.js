export default function reducer(state={
        users: [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_RANKINGS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_RANKINGS_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_RANKINGS_FULFILLED": {

            let { users } = action.payload
            
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload.users
            }
        }
    }

    return state
}
