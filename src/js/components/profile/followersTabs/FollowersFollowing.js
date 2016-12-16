import React from "react"

import PanelTabs from "./PanelTabs"
import UsersList from "./UsersList"

export default class FollowersFollowing extends React.Component {

    render() {

        const { followers, following } = this.props
        
        return (
            <PanelTabs>
                <UsersList users={followers}/>
                <UsersList users={following}/>
            </PanelTabs> 
        )
    }
}