import React from "react";

export default class MessageItem extends React.Component {

  render() {

    const { date , sender , senderImage , content } = this.props;

    return (
        <li>
            <a href="#">
                <div>
                    <strong><img src={senderImage} class="img-circle"></img> {sender}</strong>
                    <span class="pull-right text-muted">
                        <em>{date}</em>
                    </span>
                </div>
                <div>{content}</div>
            </a>
            <div class="divider"></div>
        </li>
    );
  }
}
