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
    setTimeout(() => payload.dispatch({type: payload.type + "_FULFILLED", payload: payload.default}) , 0)
}

function makeApiRequest(payload){
    
    if( gapiLoader.apiLoaded() ){
        console.log("api loaded - making request")
        var request = payload.request()
        request.execute((resp) => apiCallBack(resp, payload))
    }
    else{
        setTimeout(() => { console.log("waiting for api load"); callAPI(payload); }, 500)
    }
}

function apiCallBack(resp, payload){
    if (resp.error) {
    	payload.dispatch({type: payload.type + "_REJECTED", payload: resp.error})
    } else {
    	payload.dispatch({type: payload.type + "_FULFILLED", payload: resp.result})
    }
}