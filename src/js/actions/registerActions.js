import { callAPI } from '../scripts/gapi'

export function register(name, email, pwd) {

	return function(dispatch) {

        callAPI({
            type: "REGISTER",
        	request: (() => gapi.client.tipsters.registerUser({ name, email, pwd })),
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
