import React from "react"

export default class ProfileImage extends React.Component {

    render() {

        const { img } = this.props

        return (
            <div id="profile-image-wrapper">
                <a href="#"><img class="img-thumbnail" src={img}></img></a>
            </div>
        )
    }
}
