import React from "react"

import UserPosts from "../components/profile/UserPosts"
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

        const profile = {name:"João Almeida", img:"img/joaoalmeida.jpg", date: "6 Agosto de 1994", location:"Portugal", favSport:"Football", favTeam: "Benfica", profit:"120", followers:[{name:"Paulo Teixeira", img:"img/user2.jpg"}, {name:"João Almeida", img:"img/user3.jpg"}, {name:"Miguel Fernandes", img:"img/user4.jpg"},{name:"Ricardo Vieira", img:"img/user5.jpg"},{name:"Carlos Oliveira", img:"img/user6.jpg"},{name:"Maria Carmo", img:"img/user7.jpg"},{name:"Paulo Teixeira", img:"img/user8.jpg"},{name:"Joao Almeida", img:"img/user1.jpg"}], following:[{name:"João Almeida", img:"img/user1.jpg"}, {name:"Paulo Teixeira", img:"img/user3.jpg"}, {name:"Ricardo Vieira", img:"img/user5.jpg"},{name:"Carlos Oliveira", img:"img/user7.jpg"},{name:"Maria Carmo", img:"img/user2.jpg"},{name:"Paulo Teixeira", img:"img/user8.jpg"},{name:"Miguel Fernandes", img:"img/user4.jpg"},{name:"Joao Almeida", img:"img/user6.jpg"}]}
        
        return (

            <div id="profile-container">

                <MainAvatar name={profile.name} img={profile.img} following={this.state.following} toggleFollow={this.toggleFollow.bind(this)}/>

                <LeftColumnContainer profile={profile}/>

                <RightColumnContainer user={profile.name} />
                
                <UserPosts user={profile} />

            </div>
        )
    }
}
