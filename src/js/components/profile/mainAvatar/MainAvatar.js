import React from "react"

import ButtonsContainer from "./buttons/ButtonsContainer"
import ProfileImage from "./ProfileImage"
import ProfileName from "./ProfileName"

export default class MainAvatar extends React.Component {

    render() {

        const { name, img, following, toggleFollow } = this.props

        return (
            <div class="main-avatar col-xs-12 col-lg-10 col-lg-push-1">
            
                <img id="topimage" src="img/profile-cover.jpg" />

                <ProfileImage img={img} />

                <ProfileName name={name} />

                <ButtonsContainer following={following} toggleFollow={toggleFollow}/>

            </div>
        )
    }
}
