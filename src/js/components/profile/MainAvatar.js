import React from "react"
import { connect } from "react-redux"

import { newMessage } from "../../actions/messagesActions"

import {ButtonToolbar} from "react-bootstrap"

@connect()
export default class MainAvatar extends React.Component {

    render() {

        console.log(this.props)

        const { following, toggleFollow } = this.props

        const followButton = {text:following?"Following":"Follow",
                              icon:following?"fa fa-check":"fa fa-user-plus"}

        return (
            <div class="main-avatar">
                <img id="topimage" src="img/profile-cover.jpg" />

                <div id="profile-image-wrapper">
                    <a href="#"><img class="img-thumbnail" src="img/joaoalmeida.jpg"></img></a>
                </div>

                <a id="profile-name" href="#/profile">João Almeida</a>

                <div class="container">
                    <ButtonToolbar>
                        <button type="button" class="btn" onClick={() => toggleFollow()}><i class={followButton.icon} aria-hidden="true"></i> <span class="hidden-xs">{followButton.text}</span></button>
                        <button type="button" class="btn" onClick={() => this.props.dispatch(newMessage("João Almeida"))}><i class="fa fa-envelope" aria-hidden="true"></i> <span class="hidden-xs">Message</span></button>
                    </ButtonToolbar>
                </div>

            </div>
        )
    }
}
