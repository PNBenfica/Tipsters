import { callAPI } from '../scripts/gapi'

export function authenticate(name, pwd) {

    console.log(name, pwd)
    
	return function(dispatch) {

        callAPI({
            type: "AUTHENTICATE",
        	path: "users/authenticate",
            method: "POST",
            body: { name, pwd },
            dispatch: dispatch,
        	default: authenticate_default()
        })

	}
}

function authenticate_default(){
	return {
        token: "SUPER_VALID_TOKEN",
        username: "Paulo Teixeira"
    }
}
