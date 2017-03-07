import React from "react"

import About from "./about/About"
import FollowersFollowing from "./followersTabs/FollowersFollowing"

export default class LeftColumnContainer extends React.Component {

    render() {

        const { profile } = this.props

        return (
            <div class="left-profile-container">

                <About profile={profile}/>

                <FollowersFollowing followers={profile.followers} following={profile.following}/>

            </div>
        )
    }
}
