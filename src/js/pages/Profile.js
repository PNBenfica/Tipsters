import React from "react"
import { connect } from "react-redux"

import { fetchProfile } from "../actions/userActions"

import About from "../components/profile/About"
import LoadingGif from "../components/LoadingGif"
import MainAvatar from "../components/profile/mainAvatar/MainAvatar"
import Recomendations from "../components/profile/Recomendations"
import TopStatsPanels from "../components/profile/topStatsPanels/TopStatsPanels"
import UserPosts from "../components/profile/UserPosts"
import UserSlide from "../components/profile/userSlide/UserSlide"
import Stats from "../components/profile/stats/Stats"

@connect((store) => {
    return {
        profile: store.users.profile,
        fetched: store.users.fetched,
        fetching: store.users.fetching,
    }
})
export default class Profile extends React.Component {

    constructor(args){
        super(...args)
        this.state = {following:false}
    }

    componentWillMount() {
        const { username } = this.props.params
        this.fetchProfile(username)
    }

    componentWillReceiveProps(nextProps){
        const {username } = this.props.params
        if ((nextProps.params.username != username)) {
            this.fetchProfile(nextProps.params.username)
        }
    }

    fetchProfile(username){
        this.props.dispatch(fetchProfile(username))
    }

    toggleFollow(){
        const following = !this.state.following
        this.setState({ following })
    }

    render() {

        const { profile, fetched, fetching } = this.props

        if (!fetched || fetching)
            return this.renderLoadingGif()
                // <LeftColumnContainer profile={profile}/>

                // <RightColumnContainer user={profile.name} />
                
                // 

        const nFollowers = profile.followers.length
        const nFollowing = profile.following.length

        return (

            <div id="profile-container">

                <MainAvatar name={profile.name} img={profile.avatar} following={this.state.following} toggleFollow={this.toggleFollow.bind(this)}/>

                <div class="col-xs-12">

                    <About text={profile.about} />

                    <TopStatsPanels nFollowers={nFollowers} nFollowing={nFollowing}/>

                    <Recomendations />

                    <UserSlide title={nFollowers + " Followers"} tipsters={profile.followers} />

                    <UserSlide title={nFollowing + " Following"} tipsters={profile.following} />

                    <Stats />
                    
                    <UserPosts username={profile.name} />

                </div>

            </div>
        )
    }

    renderLoadingGif(){
        return <div id="profile-container"><LoadingGif /></div>
    }
}
