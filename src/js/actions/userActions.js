import { callAPI } from '../scripts/gapi'

export function fetchProfile(username) {

	return function(dispatch) {

        callAPI({
            type: "FETCH_PROFILE",
        	request: (() => gapi.client.tipsters.getUserProfile({ username })),
            dispatch: dispatch,
        	default: fetchProfile_default(username)
        })

	}
}

function fetchProfile_default(username){
	return {
        name: username,
        avatar:"img/joaoalmeida.jpg",
        followers:[{name:"Paulo Teixeira", avatar:"img/user2.jpg"}, {name:"João Almeida", avatar:"img/user3.jpg"}, {name:"Miguel Fernandes", avatar:"img/user4.jpg"},{name:"Ricardo Vieira", avatar:"img/user5.jpg"},{name:"Carlos Oliveira", avatar:"img/user6.jpg"},{name:"Maria Carmo", avatar:"img/user7.jpg"},{name:"Paulo Teixeira", avatar:"img/user8.jpg"},{name:"Joao Almeida", avatar:"img/user1.jpg"}],
        following:[{name:"João Almeida", avatar:"img/user1.jpg"}, {name:"Paulo Teixeira", avatar:"img/user3.jpg"}, {name:"Ricardo Vieira", avatar:"img/user5.jpg"},{name:"Carlos Oliveira", avatar:"img/user7.jpg"},{name:"Maria Carmo", avatar:"img/user2.jpg"},{name:"Paulo Teixeira", avatar:"img/user8.jpg"},{name:"Miguel Fernandes", avatar:"img/user4.jpg"},{name:"Joao Almeida", avatar:"img/user6.jpg"}]
    }
}