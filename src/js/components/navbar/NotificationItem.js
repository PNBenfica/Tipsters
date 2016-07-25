import React from "react";
var classNames = require('classnames');

export default class NotificationItem extends React.Component {

  render() {

    const { date , content , type, notificationImage} = this.props;
    const iconClasses = classNames('fa','fa-fw', type);

    return (
        <li>
            <a href="#">
                <div>
                    <span class="pull-right text-muted">
                        <i className={iconClasses}></i>
                        <em> {date}</em>
                    </span>
                </div>
                <div><img src={notificationImage} class="img-circle"></img> {content}</div>
            </a>
            <div class="divider"></div>
        </li>
    );
  }
}
