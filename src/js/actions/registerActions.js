import { callAPI } from '../scripts/gapi'

export function register(name, email, pwd) {

	return function(dispatch) {

        callAPI({
            type: "REGISTER",
            path: "users",
            method: "POST",
            body: { name, email, pwd },
            dispatch: dispatch,
        	default: register_default()
        })

	}
}

function register_default(){
	return {
        greeting: "User successful created",
    }
}
