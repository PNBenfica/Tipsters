import React from "react"

import About from "./about/About"
import FollowersFollowing from "./followersTabs/FollowersFollowing"

export default class LeftColumnContainer extends React.Component {

    render() {

        const {info} = this.props

        return (
            <div class="col-xs-12 col-md-5 col-lg-4 col-lg-push-1">

                <About info={info}/>

                <FollowersFollowing followers={info.followers} following={info.following}/>

            </div>
        )
    }
}
