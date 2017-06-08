import React from "react"

import Button from "./Button"

export default class FollowButton extends React.Component {

    render() {

        const { following, toggleFollow } = this.props

        const text = following ? "Following" : "Follow"
        const icon = following ? "fa fa-check" : "fa fa-user-plus"

        return (
            <Button text={text} icon={icon} onClick={toggleFollow} />
        )
    }
}
