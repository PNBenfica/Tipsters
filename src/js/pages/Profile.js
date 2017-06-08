import React from "react"
import { connect } from "react-redux"

import { fetchProfile } from "../actions/userActions"

import About from "../components/profile/About"
import LoadingGif from "../components/LoadingGif"
import Header from "../components/profile/header/Header"
import Page from "./Page"
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

    renderHeader(){
        const { profile } = this.props
        return <Header name={this.props.params.username} img={profile.avatar} following={this.state.following} toggleFollow={this.toggleFollow.bind(this)}/>
    }

    renderBody(){

        const { profile } = this.props
            
        const nFollowers = profile.followers.length
        const nFollowing = profile.following.length



        return (

                <div class="col-xs-12">

                    <About text={profile.about} />

                    <TopStatsPanels nFollowers={nFollowers} nFollowing={nFollowing}/>

                    <UserSlide title={nFollowers + " Followers"} tipsters={profile.followers} />

                    <UserSlide title={nFollowing + " Following"} tipsters={profile.following} />

                    <Stats />
                    
                    <UserPosts username={profile.name} />
                </div>

            )
    }


    render() {

        const { fetched, fetching } = this.props

        const loading = fetching || !fetched 

        const customHeader = this.renderHeader()

        const body = loading ? null : this.renderBody()

        return (

            <Page id="profile-container" title={this.props.params.username} customHeader={ customHeader } loading={loading} img="img/covers/profile.jpg" >
                
                { body }

            </Page>


        )
    }

    renderLoadingGif(){
        return <div id="profile-container"><LoadingGif /></div>
    }
}
