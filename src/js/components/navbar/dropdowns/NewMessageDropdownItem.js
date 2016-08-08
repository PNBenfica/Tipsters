import React from "react";

export default class NewMessageDropdownItem extends React.Component {

  render() {

    return (
        <li class="dropdown-fixed-element">
            <a class="text-center" href="#">
                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                <strong> New Message</strong>
            </a>
        </li>
    );
  }
}
