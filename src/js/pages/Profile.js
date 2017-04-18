import React from "react"
import { connect } from "react-redux"

import { fetchProfile } from "../actions/userActions"

import UserPosts from "../components/profile/UserPosts"
import About from "../components/profile/About"
import LoadingGif from "../components/LoadingGif"
import MainAvatar from "../components/profile/mainAvatar/MainAvatar"

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
                
                // <UserPosts username={profile.name} />
        return (

            <div id="profile-container">

                <MainAvatar name={profile.name} img={profile.avatar} following={this.state.following} toggleFollow={this.toggleFollow.bind(this)}/>

                <About text={profile.about} />

            </div>
        )
    }

    renderLoadingGif(){
        return <div id="profile-container"><LoadingGif /></div>
    }
}
