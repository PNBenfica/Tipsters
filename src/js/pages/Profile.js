import React from "react"
import { connect } from "react-redux"

import { fetchProfile, followUser, updateImage } from "../actions/userActions"

import classNames from "classnames"

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

    construtor(args){
        this.state = { newImage : "" }
    }

    componentWillMount() {
        const { username } = this.props.params
        this.fetchProfile(username)
        this.setState({ myProfile : username === localStorage.username })
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
        const { profile } = this.props
        this.props.dispatch(followUser(profile.name))
    }

    onUpdateImageInputChange(ev){
        const newImage = ev.target.value
        this.setState({ newImage })
    }

    updateImage(img){
        this.props.dispatch(updateImage(this.state.newImage))
    }

    renderHeader(loading){
        if (loading)
            return <h2>{this.props.params.username}</h2>
        else {
            const { profile } = this.props
            const { myProfile, newImage } = this.state
            return <Header name={profile.name} img={profile.avatar} following={profile.is_following} toggleFollow={this.toggleFollow.bind(this)} myProfile={myProfile} inputValue={newImage} updateImage={this.updateImage.bind(this)} onInputChange={this.onUpdateImageInputChange.bind(this)} />
        }
    }

    renderBody(){

        const { profile } = this.props
        const { followers = [], following = [] } = profile
            
        const nFollowers = followers.length
        const nFollowing = following.length



        return (

                <div class="col-xs-12">

                    <About text={profile.about} />

                    <TopStatsPanels ROI={profile.stats.ROI} nFollowers={nFollowers} nFollowing={nFollowing}/>

                    <UserSlide title={nFollowers + " Followers"} tipsters={followers} />

                    <UserSlide title={nFollowing + " Following"} tipsters={following} />
                    
                    <UserPosts username={profile.name} />

                </div>

            )
    }


    render() {

        const { fetched, fetching } = this.props
        const { myProfile } = this.state

        const loading = fetching || !fetched 

        const customHeader = this.renderHeader(loading)

        const body = loading ? null : this.renderBody()

        return (

            <Page id="profile-container" classes={classNames( { myProfile } )} title={this.props.params.username} customHeader={ customHeader } loading={loading} img="img/covers/profile.jpg" >
                
                { body }

            </Page>


        )
    }

    renderLoadingGif(){
        return <div id="profile-container"><LoadingGif /></div>
    }
}
