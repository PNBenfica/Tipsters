import React from "react";

import UserListItem from "./UserListItem";
import SeeAllButton from "./SeeAllButton";

export default class UsersList extends React.Component {

    render() {

        const Users = this.props.users.map((user, i) => <UserListItem key={i} {...user}/>)

        return (
            <div class="col-xs-12 user-list-container">

                {Users}

                <SeeAllButton />
                
            </div>        
        );
    }
}