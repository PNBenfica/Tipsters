import React from "react"

import PostsContainer from "./../PostsContainer"

export default class UserPosts extends React.Component {

    render() {

    	const { username } = this.props

        return (
            <div class="profile-posts-container col-xs-12 col-sm-8 col-sm-push-2">
                
                <PostsContainer username={username} />

            </div>
        )
    }
}