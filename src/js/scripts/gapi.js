import gapiLoader from './gapiLoader'


const TESTING_INTERFACE = false


export function callAPI(payload){

    payload.dispatch({type: payload.type + "_PENDING", params: payload.action})

    if (TESTING_INTERFACE)
        simulateInterface(payload)

    else
        makeApiRequest(payload)

}

function simulateInterface(payload){
    setTimeout(() => payload.dispatch({type: payload.type + "_FULFILLED", payload: payload.default}) , 2000)
}

function makeApiRequest(payload){
    
    if( gapiLoader.apiLoaded() ){
        console.log("api loaded - making request")

        const path = window.location.origin+"/_ah/api/tipsters/v1/" + payload.path
        const headers = payload.auth ? { 'authorization': getAuthToken() } : {}
        const { params, method, body } = payload
        const request = { path, headers, params, body, method }
        console.log(request)
        
        gapi.client.request(request).then((resp) => apiCallBack(resp, payload))
    }
    else{
        setTimeout(() => { console.log("waiting for api load"); callAPI(payload); }, 2000)
    }
}

function apiCallBack(resp, payload){
    if (resp.error) {
    	payload.dispatch({type: payload.type + "_REJECTED", payload: resp.error})
    } else {
    	payload.dispatch({type: payload.type + "_FULFILLED", payload: resp.result})
    }
}

function getAuthToken(){
    return localStorage.access_token
}