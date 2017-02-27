import React from "react"

import UserAvatar from "./UserAvatar"
import UserSidebar from "./UserSidebar"

export default class UserAvatarLink extends React.Component {

    render() {

    	const { onClick, open } = this.props

        return (

            <div class="link" onClick={() => onClick()}>

                <UserAvatar />

                <UserSidebar open={open} />
                
            </div>
        )
    }
}
