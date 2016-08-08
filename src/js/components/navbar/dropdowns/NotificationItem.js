import React from "react";
import classNames from "classnames";
import {Media} from "react-bootstrap";

import DropdownItemImage from "./DropdownItemImage";

export default class NotificationItem extends React.Component {

  render() {

    const { date , content , type, tipsterName, tipsterImage} = this.props;
    const iconClasses = classNames('fa','fa-fw', type);

    return (
        <li>
            <Media>

                <DropdownItemImage img={tipsterImage}/>

                <Media.Body>
                    <strong>{tipsterName} </strong>{content}
                    <p class="dropdown-menu-item-time">
                        <i class={iconClasses}></i>
                        <em> {date}</em>
                    </p>
                </Media.Body>

            </Media>
            <div class="divider"></div>
        </li>
    );
  }
}
