import { callAPI } from '../scripts/gapi'

export function fetchRankings() {

	return function(dispatch) {

        callAPI({
            type: "FETCH_RANKINGS",
        	path: "rankings",
            dispatch,
        	default: fetchRankings_default()
        })

	}
}

function fetchRankings_default(){
	return {
        users:[
			{"stats": { "ROI": -41.66666666666667, "avgWinOdds": 1.75, "nFollowers": "6", "nTips": "3", "streak": "0", "winPercentage": 0.3333333333333333},
			"tipster": {"avatar": "img/user8.jpg","name": "Aimar Bernardo"}},
			{"stats": { "ROI": -100, "avgWinOdds": 0, "nFollowers": "4", "nTips": "3", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/user4.jpg","name": "Calado Diamantino"}},
			{"stats": { "ROI": -100, "avgWinOdds": 0, "nFollowers": "8", "nTips": "1", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/user5.jpg","name": "Ederson Florentino"}},
			{"stats": { "ROI": -100, "avgWinOdds": 0, "nFollowers": "3", "nTips": "2", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/joaoalmeida.jpg","name": "Gamarra Hooijdonk"}},
			{"stats": { "ROI": -100, "avgWinOdds": 0, "nFollowers": "4", "nTips": "3", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/user5.jpg","name": "Isaltino Jovic"}},
			{"stats": { "ROI": -100, "avgWinOdds": 0, "nFollowers": "9", "nTips": "2", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/user1.jpg","name": "Kostas Lazar"}},
			{"stats": { "ROI": -100, "avgWinOdds": 0, "nFollowers": "8", "nTips": "1", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/user7.jpg","name": "Mitroglou Nuno"}},
			{"stats": { "ROI": 0, "avgWinOdds": 2, "nFollowers": "4", "nTips": "2", "streak": "1", "winPercentage": 0.5},
			"tipster": {"avatar": "img/user7.jpg","name": "Otavio Preudhomme"}},
			{"stats": { "ROI": -100, "avgWinOdds": 0, "nFollowers": "3", "nTips": "1", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/user2.jpg","name": "Renato Sanches"}},
			{"stats": { "ROI": 0, "avgWinOdds": 0, "nFollowers": "5", "nTips": "0", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/joaoalmeida.jpg","name": "Tamara Umbigo"}} ,
			{"stats": { "ROI": 0, "avgWinOdds": 0, "nFollowers": "7", "nTips": "0", "streak": "0", "winPercentage": 0},
			"tipster": {"avatar": "img/user8.jpg","name": "Xandao Zahovic"}}]
    }
}


export function sortRankings(sortBy) {

	return {
        type: "SORT_RANKINGS",
        payload: sortBy
	}
}
