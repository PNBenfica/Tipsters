import React from "react"

import About from "./about/About"
import FollowersFollowing from "./followersTabs/FollowersFollowing"

export default class LeftColumnContainer extends React.Component {

    render() {

        const { profile } = this.props

        return (
            <div class="col-xs-12 col-md-5 col-lg-4 col-lg-push-1">

                <About profile={profile}/>

                <FollowersFollowing followers={profile.followers} following={profile.following}/>

            </div>
        )
    }
}
