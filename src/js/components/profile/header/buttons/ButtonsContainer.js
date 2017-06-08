import React from "react"

import {ButtonToolbar} from "react-bootstrap"

import FollowButton from "./FollowButton"
import MessageButton from "./MessageButton"

export default class ButtonsContainer extends React.Component {

    render() {

        const { following, toggleFollow } = this.props

        const followButton = following ? {text:"Following", icon: "fa fa-check"} : {text:"Follow", icon: "fa fa-user-plus"}

        return (
            <div class="main-avatar-actions">
                <FollowButton following={following} toggleFollow={toggleFollow}/>
                <MessageButton />
            </div>
        )
    }
}
