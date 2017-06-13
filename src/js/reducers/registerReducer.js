export default function reducer(state={
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "REGISTER_PENDING": {
            return {...state, fetching: true}
        }
        case "REGISTER_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "REGISTER_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true
            }

        }
    }

    return state
}
