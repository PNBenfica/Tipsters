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

            return {
                ...state,
                fetching: false,
                fetched: true,
                profile
            }
        }
        case "FOLLOW_USER_PENDING": {
            let { profile } = state
            profile = Object.assign({}, profile, { is_following: !profile.is_following })

            return {
                ...state,
                profile
            }
        }
        case "UPDATE_IMAGE_PENDING": {
            let { profile } = state
            let { avatar } = action.params
            profile = Object.assign({}, profile, { avatar })

            return {
                ...state,
                profile
            }
        }
    }

    return state
}
