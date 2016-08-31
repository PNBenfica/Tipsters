import gapiLoader from './gapiLoader';


export function callAPI(payload){

    payload.dispatch({type: payload.type + "_PENDING"})
    
    if( gapiLoader.apiLoaded() ){
        console.log("api loaded - making request");
        var request = payload.request();
        request.execute((resp) => apiCallBack(resp, payload));
    }
    else{
        setTimeout(() => { console.log("waiting for api load"); callAPI(payload); }, 2000);
    }
}

function apiCallBack(resp, payload){
    if (resp.error) {
    	payload.dispatch({type: payload.type + "_REJECTED", payload: resp.error})
    } else {
    	payload.dispatch({type: payload.type + "_FULFILLED", payload: resp.result})
    }
}