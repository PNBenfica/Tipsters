import React from "react";

export default class MessageItem extends React.Component {

  render() {

    const { date , sender , senderImage , content } = this.props;

    return (
        <li>
            <div class="media">
                <a class="media-left" href="#">
                    <img class="media-object" src={senderImage} class="img-rounded"/>
                </a>
                <div class="media-body">
                    <h5 class="media-heading">
                        <strong>{sender}</strong>
                        <span class="dropdown-menu-item-time pull-right text-muted">
                            <i class="fa fa-clock-o fa-fw"></i>
                            <em>{date}</em>
                        </span>
                    </h5>
                    {content}
                </div>
            </div>
            <div class="divider"></div>
        </li>
    );
  }
}
