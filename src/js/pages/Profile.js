import React from "react"

import LeftColumnContainer from "../components/profile/LeftColumnContainer"
import MainAvatar from "../components/profile/mainAvatar/MainAvatar"
import RightColumnContainer from "../components/profile/RightColumnContainer"

export default class Profile extends React.Component {

    constructor(args){
        super(...args)
        this.state = {following:false}
    }

    toggleFollow(){
        const following = !this.state.following
        this.setState({ following })
    }

    render() {

        const info = {name:"João Almeida", img:"img/joaoalmeida.jpg", date: "6 Agosto de 1994", location:"Portugal", favSport:"Football", favTeam: "Benfica", profit:"120", followers:[{name:"Paulo Teixeira", img:"img/pauloteixeira.jpg"}, {name:"João Almeida", img:"img/joaoalmeida.jpg"}, {name:"Miguel Fernandes", img:"img/tennis.png"},{name:"Ricardo Vieira", img:"img/tennis.png"},{name:"Carlos Oliveira", img:"img/basket.jpg"},{name:"Maria Carmo", img:"img/run.png"},{name:"Paulo Teixeira", img:"img/pauloteixeira.jpg"},{name:"Joao Almeida", img:"img/joaoalmeida.jpg"}], following:[{name:"João Almeida", img:"img/joaoalmeida.jpg"}, {name:"Paulo Teixeira", img:"img/pauloteixeira.jpg"}, {name:"Ricardo Vieira", img:"img/tennis.png"},{name:"Carlos Oliveira", img:"img/basket.jpg"},{name:"Maria Carmo", img:"img/run.png"},{name:"Paulo Teixeira", img:"img/pauloteixeira.jpg"},{name:"Miguel Fernandes", img:"img/tennis.png"},{name:"Joao Almeida", img:"img/joaoalmeida.jpg"}]}
        
        return (

            <div class="row" id="profile-container">

                <MainAvatar name={info.name} img={info.img} following={this.state.following} toggleFollow={this.toggleFollow.bind(this)}/>

                <LeftColumnContainer info={info}/>

                <RightColumnContainer />

            </div>
        )
    }
}
