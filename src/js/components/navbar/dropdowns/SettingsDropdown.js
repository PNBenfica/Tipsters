import React from "react";

export default class SettingsDropdown extends React.Component {

  render() {

    return (

        <li class="dropdown hidden-xs">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <i class="fa fa-caret-down"></i>
            </a>
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
