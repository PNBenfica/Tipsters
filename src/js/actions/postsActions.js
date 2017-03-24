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
            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
			  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
		  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            }
            ]
        }
}


export function addComment(post_id, comment) {

	return function(dispatch) {

        callAPI({
            type: "ADD_COMMENT",
        	request: (() => gapi.client.tipsters.addComment({ post_id, comment })),
            dispatch: dispatch,
        	action: { post_id, comment }
        })

	}
}
