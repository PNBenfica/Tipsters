import React from "react"
import { connect } from "react-redux"

import { fetchProfile } from "../actions/userActions"

import UserPosts from "../components/profile/UserPosts"
import LeftColumnContainer from "../components/profile/LeftColumnContainer"
import LoadingGif from "../components/LoadingGif"
import MainAvatar from "../components/profile/mainAvatar/MainAvatar"
import RightColumnContainer from "../components/profile/RightColumnContainer"

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
        
        return (

            <div id="profile-container">

                <MainAvatar name={profile.name} img={profile.avatar} following={this.state.following} toggleFollow={this.toggleFollow.bind(this)}/>

                <LeftColumnContainer profile={profile}/>

                <RightColumnContainer user={profile.name} />
                
                <UserPosts username={profile.name} />

            </div>
        )
    }

    renderLoadingGif(){
        return <div id="profile-container"><LoadingGif /></div>
    }
}
