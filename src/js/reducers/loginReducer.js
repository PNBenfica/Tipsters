export default function reducer(state={
        token: null,
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "AUTHENTICATE_PENDING": {
            return {...state, fetching: true}
        }
        case "AUTHENTICATE_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "AUTHENTICATE_FULFILLED": {

            const token = action.payload.greeting
            console.log("TOKEN: " + token)

            return {
                ...state,
                fetching: false,
                fetched: true,
                token
            }
        }
    }

    return state
}
