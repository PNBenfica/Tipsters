import { callAPI } from '../scripts/gapi'

export function fetchProfile(username) {

	return function(dispatch) {

        callAPI({
            type: "FETCH_PROFILE",
            path: "users/" + username,
            auth: true,
            dispatch: dispatch,
        	default: fetchProfile_default(username),
        })

	}
}

function fetchProfile_default(username){
	return {
        name: username,
        avatar:"img/joaoalmeida.jpg",
        about:"O meu percurso enquanto trader profissional é o resultado de dois percursos distintos, um enquanto profissional em vários cargos na area do futebol e outro enquanto apostador…Largos anos de experiência ligado ao mundo do futebol, passagens como Treinador por diversos clubes, entre eles a formação do Sporting CP, por diversas agências de Gestão de Carreiras de jogadores profissionais de futebol, e na area do Scoutng (observação e captação de novos talentos)",
        followers:[{name:"Paulo Teixeira", avatar:"img/user2.jpg"}, {name:"João Almeida", avatar:"img/user3.jpg"}, {name:"Miguel Fernandes", avatar:"img/user4.jpg"},{name:"Ricardo Vieira", avatar:"img/user5.jpg"},{name:"Carlos Oliveira", avatar:"img/user6.jpg"},{name:"Maria Carmo", avatar:"img/user7.jpg"},{name:"Paulo Teixeira", avatar:"img/user8.jpg"},{name:"Joao Almeida", avatar:"img/user1.jpg"}],
        following:[{name:"João Almeida", avatar:"img/user1.jpg"}, {name:"Paulo Teixeira", avatar:"img/user3.jpg"}, {name:"Ricardo Vieira", avatar:"img/user5.jpg"},{name:"Carlos Oliveira", avatar:"img/user7.jpg"},{name:"Maria Carmo", avatar:"img/user2.jpg"},{name:"Paulo Teixeira", avatar:"img/user8.jpg"},{name:"Miguel Fernandes", avatar:"img/user4.jpg"},{name:"Joao Almeida", avatar:"img/user6.jpg"}],
        is_following: false,
        stats: { ROI: 5.41 }
    }
}

export function followUser(username) {

    return function(dispatch) {

        callAPI({
            type: "FOLLOW_USER",
            path: "users/follow/" + username,
            method: "POST",
            auth: true,
            dispatch: dispatch,
            action: { username }
        })

    }
}

export function updateImage(avatar) {

    return updateUser("UPDATE_IMAGE", { avatar })

}

export function updateAbout(about) {

    return updateUser("UPDATE_ABOUT", { about })

}



export function updateUser(type, values) {

    return function(dispatch) {

        callAPI({
            type,
            path: "users",
            body: values,
            method: "PUT",
            auth: true,
            dispatch: dispatch,
            action: values
        })

    }

}