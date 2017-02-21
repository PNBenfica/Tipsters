import React from "react"

import UserAvatar from "./UserAvatar"
import UserDropdown from "./dropdowns/settings/UserDropdown"

export default class UserAvatarLink extends React.Component {

    render() {

        return (

            <div class="link">
            
                <UserAvatar />

                <UserDropdown />

            </div>
        )
    }
}
