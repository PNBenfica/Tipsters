import { callAPI } from '../scripts/gapi'

export function fetchTrends() {

	return function(dispatch) {

        callAPI({
            type: "FETCH_TRENDS",
        	request: (() => gapi.client.tipsters.fetchTrends()),
            dispatch: dispatch,
        	default: fetchTrends_default()
        })

	}
}

function fetchTrends_default(){
	return {
        users:[
            {tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" }, following: false, description:"Is on a 27 loosing streak!"},
            {tipster : { name: "Paulo Teixeira", avatar : "img/pauloteixeira.jpg" }, following: true, description:"Is on a 5 green tips streak!"}],
        events:[
            {homeTeam: {name: "Arsenal", logo: "img/sports/arsenal.png"}, awayTeam: {name: "Liverpool", logo: "img/sports/liverpool.jpg"}, description:"20 tips shared in the last hour", eventUrl:"#/sports/football/1/premier-league/3/arsenal-united/1267076"}, 
            {homeTeam: {name: "Real Madrid", logo: "img/sports/realmadrid.png"}, awayTeam: {name: "Barcelona", logo: "img/sports/barcelona.png"}, description:"9 tips shared in the last hour", eventUrl:"#/sports/football/1/premier-league/3/arsenal-united/1267076"}]
	}
}


export function followUser(username) {

	return function(dispatch) {

        callAPI({
            type: "FOLLOW_USER",
        	request: (() => gapi.client.tipsters.followUser({ username })),
            auth: true,
            dispatch: dispatch,
        	action: { username }
        })

	}
}
