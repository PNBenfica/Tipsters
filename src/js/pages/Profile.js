import React from "react"

import About from "../components/profile/About"
import MainAvatar from "../components/profile/MainAvatar"
import PanelTabs from "../components/profile/PanelTabs"
import PostsContainer from "../components/PostsContainer"
import Stats from "../components/profile/Stats"
import UsersList from "../components/profile/UsersList"

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
        return (

            <div class="row" id="profile-container">

                <div class="col-xs-12 col-lg-10 col-lg-push-1">
                    <MainAvatar following={this.state.following} toggleFollow={this.toggleFollow.bind(this)}/>
                </div>

                <div class="col-xs-12 col-md-5 col-lg-4 col-lg-push-1">

                    <About />

                    <PanelTabs>
                        <UsersList />
                        <UsersList />
                    </PanelTabs>
                </div>

                <div class="col-xs-12 col-md-7 col-lg-5 col-lg-push-2">
                    <Stats />
                </div>

                <div class="col-xs-12">
                    <div class="col-xs-12 col-md-9 col-lg-6 col-md-push-2 col-lg-push-1 feed-container">
                        <PostsContainer />
                    </div>
                </div>

            </div>
        )
    }
}
