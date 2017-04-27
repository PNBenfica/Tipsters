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
        case "SORT_RANKINGS": {

            let { users } = state
            const sortBy = action.payload
            console.log(action)

            users = users.sort((user1,user2) => { console.log(parseFloat(user2.stats[sortBy])); return parseFloat(user2.stats[sortBy]) - parseFloat(user1.stats[sortBy]) })
            users.forEach((user,i) => user.rank = i + 1)
            
            return {
                ...state,
                users
            }
        }
    }

    return state
}
