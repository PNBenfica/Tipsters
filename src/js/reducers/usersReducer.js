export default function reducer(state={
        profile: {},
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_PROFILE_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_PROFILE_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_PROFILE_FULFILLED": {
            const profile = action.payload

            profile.date = "6 Agosto de 1994"
            profile.location = "Portugal"
            profile.favSport = "Football"
            profile.favTeam = "Benfica"
            profile.profit ="120"

            return {
                ...state,
                fetching: false,
                fetched: true,
                profile
            }
        }
    }

    return state
}
