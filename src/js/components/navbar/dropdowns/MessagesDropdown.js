import React from "react";

import DropdownIcon from "./DropdownIcon";
import LoadMoreDropdownItems from "./LoadMoreDropdownItems";
import MessageItem from "./MessageItem";
import NewMessageDropdownItem from "./NewMessageDropdownItem";

export default class MessagesDropdown extends React.Component {

  render() {

    const Messages = [
        {
            date : "15:11",
            sender : "John Smith",
            senderImage : "img/joaoalmeida.jpg",
            content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend..."
        },
        {
            date : "13:53",
            sender : "Paulo Teixeira",
            senderImage : "img/pauloteixeira.jpg",
            content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend..."
        },
        {
            date : "Ter",
            sender : "John Smith",
            senderImage : "img/joaoalmeida.jpg",
            content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend..."
        }
    ].map(({date, sender, senderImage, content}, i) => <MessageItem key={i} date={date} sender={sender} senderImage={senderImage} content={content}/> );

    return (
        <li class="dropdown">

            <DropdownIcon icon="fa-envelope" badge="badge-red" newItems="2"/>

            <ul class="dropdown-menu dropdown-messages col-xs-12">
                
                <div class="dropdown-content-container">
                    {Messages}
                    <LoadMoreDropdownItems />
                </div>

                <li class="divider"></li>

                <NewMessageDropdownItem />
            </ul>
        </li>
    );
  }
}
