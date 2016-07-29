import React from "react";
var classNames = require('classnames');

export default class NotificationItem extends React.Component {

  render() {

    const { date , content , type, tipsterName, tipsterImage} = this.props;
    const iconClasses = classNames('fa','fa-fw', type);

    return (
        <li>
            <div class="media">
                <a class="media-left" href="#">
                    <img class="media-object" src={tipsterImage} class="img-rounded"/>
                </a>
                <div class="media-body">
                    <strong>{tipsterName} </strong>{content}
                    <p class="dropdown-menu-item-time">
                        <i className={iconClasses}></i>
                        <em> {date}</em>
                    </p>
                </div>
            </div>
            <div class="divider"></div>
        </li>
    );
  }
}
