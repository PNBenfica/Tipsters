import { callAPI } from '../scripts/gapi'

export function fetchPosts() {

	return function(dispatch) {

        callAPI({
            type: "FETCH_POSTS",
        	path: "users/posts",
            auth: true,
            dispatch,
        	default: fetchPosts_default()
        })

	}
}

export function fetchPost(post_id) {

	return function(dispatch) {

        callAPI({
            type: "FETCH_POST",
        	path: "users/posts/" + post_id,
            auth: true,
            dispatch,
        	default: fetchPost_default()
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
            date : "2017-03-26 16:44:49",
            liked: false,
            nLikes : "5",
            nComments : "2",
            totalOdd : 3.41,
            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
			  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
		  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123457",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 10:31:49",
	            liked: true,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123458",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 09:31:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123459",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 02:31:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123460",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 01:34:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123461",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 01:25:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123462",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 01:20:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },{
	            websafeKey : "123463",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 01:15:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
		  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123464",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 01:13:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123465",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 01:05:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123466",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 01:01:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123467",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 00:30:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123468",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 00:25:49",
	            liked: false,
	            nLikes : "5",
	            nComments : "2",
	            totalOdd : 3.41,
	            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
				  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
			  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
            },
            {
	            websafeKey : "123469",
	            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
	            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
	            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
	            date : "2017-03-26 00:20:49",
	            liked: false,
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

function fetchPost_default(){
	return {
            websafeKey : "123456",
            tips : [ {"betId": "30417634", "betName": "Match Result", "choiceId": "225552902", "choiceName": "Manchester United", "leagueId": "3", "leagueName": "Eng. Premier League", "matchId": "1267076", "matchName": "Manchester United - Arsenal", "odd": 2.45, "sportId": "1", "sportName": "Football", "status": "Pendent"}],
            comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
            tipster : { name: "João Almeida", avatar : "img/joaoalmeida.jpg" },
            date : "2017-03-26 16:44:49",
            liked: false,
            nLikes : "5",
            nComments : "2",
            totalOdd : 3.41,
            video: "video/beach-soccer.mp4",
            comments : [ { "comment": "This will be a green!!", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user3.jpg", "name": "Calado Diamantino" }},
			  			 { "comment": "What a wonderful tip", "date": "2017-03-24 00:03:05", "tipster": { "avatar": "img/user8.jpg", "name": "Aimar Bernardo" } },
		  				 { "comment": "I ain't gonna follow that mofo", "date": "2017-03-24 00:03:05", "tipster": {"avatar": "img/user2.jpg", "name": "Xandao Zahovic" } }]
        }
}



export function fetchUserPosts(username) {

	return function(dispatch) {

        callAPI({
            type: "FETCH_POSTS",
        	path: "users/" + username + "/posts",
            auth: true,
            dispatch,
        	default: fetchPosts_default()
        })

	}
}


export function addComment(post_id, comment) {

	return function(dispatch) {

        callAPI({
            type: "ADD_COMMENT",
        	path: "users/posts/" + post_id + "/comment",
        	method: "POST",
        	body: { comment },
            auth: true,
            dispatch: dispatch,
        	action: { post_id, comment }
        })

	}
}


export function likePost(post_id) {

	return function(dispatch) {

        callAPI({
            type: "LIKE_POST",
        	path: "users/posts/" + post_id + "/like",
        	method: "POST",
            auth: true,
            dispatch: dispatch,
        	action: { post_id }
        })

	}
}
