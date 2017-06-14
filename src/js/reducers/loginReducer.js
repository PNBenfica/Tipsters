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

            const { username, token } = action.payload
            localStorage.setItem('access_token', token);
            localStorage.setItem('username', username);

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
