import React from "react";

import UserAvatar from "./UserAvatar";

export default class UserDropdown extends React.Component {

  render() {

    return (

        <li class="dropdown hidden-xs">
        
            <UserAvatar />

            <ul class="dropdown-menu">
                <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                </li>
                <li class="divider"></li>
                <li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                </li>
            </ul>
        </li>
    );
  }
}
