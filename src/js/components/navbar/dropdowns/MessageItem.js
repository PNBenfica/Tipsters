import React from "react";
import {Media} from "react-bootstrap";

import DropdownItemImage from "./DropdownItemImage";

export default class MessageItem extends React.Component {

  render() {

    const { date , sender , senderImage , content } = this.props;

    return (
        <li>
            <Media>
                
                <DropdownItemImage img={senderImage}/>

                <Media.Body>
                    <h5 class="media-heading">
                        <strong>{sender}</strong>
                        <span class="dropdown-menu-item-time pull-right text-muted">
                            <i class="fa fa-clock-o fa-fw"></i>
                            <em>{date}</em>
                        </span>
                    </h5>
                    {content}
                </Media.Body>

            </Media>
            <div class="divider"></div>
        </li>
    );
  }
}
