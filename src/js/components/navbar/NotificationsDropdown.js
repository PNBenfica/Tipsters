import React from "react";

import NotificationItem from "./NotificationItem";

export default class NotificationsDropdown extends React.Component {

  render() {

    const Notifications = [
        {
            date : "15:11",
            type : "fa-comment",
            notificationImage : "img/joaoalmeida.jpg",
            content : "John Smith e 3 outras pessoas comentaram a tua tip"
        },
        {
            date : "13:53",
            type : "fa-user",
            notificationImage : "img/pauloteixeira.jpg",
            content : "John Smith começou a seguir-te"
        },
        {
            date : "15:11",
            type : "fa-thumbs-up",
            notificationImage : "img/pauloteixeira.jpg",
            content : "John Smith gostou da tua tip"
        }
    ].map(({date, type, notificationImage, content}, i) => <NotificationItem key={i} date={date} type={type} notificationImage={notificationImage} content={content}/> );


    return (
        <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">

                <i class="fa fa-bell fa-fw"><span style={{"right":"27px"}} class="font-awesome-badge badge-green">5</span></i>
            </a>
            <ul class="dropdown-menu dropdown-notifications">
                
                {Notifications}

                <li>
                    <a class="text-center" href="#" style={{"paddingTop": "0px !important", "paddingBottom":"0px !important"}}>
                        <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
            {/*<!-- /.dropdown-alerts -->*/}
        </li>

    );
  }
}
