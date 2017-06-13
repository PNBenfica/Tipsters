import { callAPI } from '../scripts/gapi'

export function authenticate(name, pwd) {

    console.log(name, pwd)
    
	return function(dispatch) {

        callAPI({
            type: "AUTHENTICATE",
        	request: (() => gapi.client.tipsters.login({ name, pwd })),
            dispatch: dispatch,
        	default: authenticate_default()
        })

	}
}

function authenticate_default(){
	return {
        greeting: "SUPER_VALID_TOKEN",
    }
}
