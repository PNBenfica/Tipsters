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

            console.log(action.payload)
            return {
                ...state,
                fetching: false,
                fetched: true,
                tables: action.payload,
            }
        }
    }

    return state
}
