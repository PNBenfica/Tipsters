import axios from "axios";
import {callAPI} from '../scripts/gapi';

export function fetchTables(sportParams) {
	
	console.log(sportParams)

	return function(dispatch) {

        callAPI({
            type: "FETCH_TABLES",
            request: (() => gapi.client.tipsters.getOdds(sportParams)),
            dispatch: dispatch
        })

	 }
}