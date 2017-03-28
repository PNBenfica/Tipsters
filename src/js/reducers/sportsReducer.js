export default function reducer(state={
    tables: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
        case "FETCH_TABLES_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_TABLES_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_TABLES_FULFILLED": {

            return {
                ...state,
                fetching: false,
                fetched: true,
                tables: action.payload,
            }
        }
        case "ADD_POST_FULFILLED": {
            window.location.href = window.location.href.split("#")[0] + "#/posts/" + action.payload.greeting
        }
    }

    return state
}
