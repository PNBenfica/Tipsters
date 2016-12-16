import React from "react"

export default class ProfileName extends React.Component {

    render() {

        const { name } = this.props

        return (
            <a id="profile-name" href="#/profile">{name}</a>
        )
    }
}
