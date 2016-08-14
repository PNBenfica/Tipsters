import React from "react";

import UserListItem from "./UserListItem";

export default class UsersList extends React.Component {

    render() {

        const Users = [{name: "Paulo Teixeira", img: "img/pauloteixeira.jpg"}, {name: "João Almeida", img: "img/joaoalmeida.jpg"}, {name: "Miguel Fernandes", img: "img/stadium.png"},{name: "Ricardo Vieira", img: "img/tennis.png"},{name: "Carlos Oliveira", img: "img/basket.jpg"},{name: "Maria Carmo", img: "img/run.png"},{name: "Paulo Teixeira", img: "img/pauloteixeira.jpg"},{name: "Joao Almeida", img: "img/joaoalmeida.jpg"}]
            .map(({...user}, i) => <UserListItem key={i} {...user}/>)

        return (
            <div class="col-xs-12 user-list-container">

                {Users}

                <a href="#/profile" class="img-wrapper col-xs-2">
                    <p class="see-all-users"><i class="fa fa-plus-circle" aria-hidden="true"></i> See all</p>
                </a>
            </div>        
        );
    }
}