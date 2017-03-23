import { callAPI } from '../scripts/gapi'

export function fetchPosts(filters) {

	return function(dispatch) {

        callAPI({
            type: "FETCH_POSTS",
        	request: (() => gapi.client.tipsters.getFeed()),
            dispatch: dispatch,
        	default: fetchPosts_default()
        })

	}
}

function fetchPosts_default(){
	return {
        posts: [{
            websafeKey : "123456",
            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
            date : "20:47",
            nLikes : "5",
            nComments : "2",
            totalOdd : 3.41,
            comments : [ { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                         { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                         { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                         { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}]
            }
            // ,{
            // websafeKey : "123457",
            // tips : [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51, status: "Lost"}, 
            // 		 { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35, status: "Pendent"}],
            // comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
            // tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60,
            //                 lastTips : [ { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
            //                              { status: "lost", tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
            //                              { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
            //                              { status: "lost",  tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
            //                              { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}]},
            // date : "20:47",
            // likes : "5",
            // nComments : "2",
            // totalOdd : 3.41,
            // comments : [ { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
            //              { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}]
            // },{
            // websafeKey : "123458",
            // tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60,
            //                 lastTips : [ { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
            //                              { status: "lost", tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
            //                              { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
            //                              { status: "lost",  tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
            //                              { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}]},
            // date : "20:47",
            // selections : 5,
            // totalOdd : 3.41, 
            // likes : "5",
            // nComments : "2",
            // price : 0.30                     
            // }
            ]
        }
}


export function addComment(id, comment) {
    return {
        type: "ADD_COMMENT",
        payload: {id:id, comment:comment}
    }
}