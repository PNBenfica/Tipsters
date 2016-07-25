import React from "react";

import MessageItem from "./MessageItem";

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
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <i class="fa fa-envelope fa-fw"><span class="font-awesome-badge badge-red">2</span></i> 
            </a>
            <ul class="dropdown-menu dropdown-messages col-xs-12">
                
                {Messages}

                <li>
                    <a class="text-center" href="#" style={{"paddingTop": "0px !important", "paddingBottom":"0px !important"}}>
                        <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="divider"></li>
                <li>
                    <a class="text-center" href="#">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        <strong> New Message</strong>
                    </a>
                </li>
            </ul>
            {/*<!-- /.dropdown-messages -->*/}
        </li>
    );
  }
}
