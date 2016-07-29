import React from "react";

import NotificationItem from "./NotificationItem";

export default class NotificationsDropdown extends React.Component {

  render() {

    const Notifications = [
        {
            date : "15:11",
            type : "fa-comment",
            tipsterImage : "img/joaoalmeida.jpg",
            tipsterName : "John Smith",
            content : "e 3 outras pessoas comentaram a tua tip"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "13:53",
            type : "fa-user",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "começou a seguir-te"
        },
        {
            date : "15:11",
            type : "fa-thumbs-up",
            tipsterImage : "img/pauloteixeira.jpg",
            tipsterName : "John Smith",
            content : "gostou da tua tip"
        }
    ].map(({date, type, tipsterName, tipsterImage, content}, i) => <NotificationItem key={i} date={date} type={type} tipsterName={tipsterName} tipsterImage={tipsterImage} content={content}/> );


    return (
        <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">

                <i class="fa fa-bell fa-fw"><span style={{"right":"27px"}} class="font-awesome-badge badge-green">5</span></i>
            </a>
            <ul class="dropdown-menu dropdown-notifications">
                
                <div class="dropdown-content-container">
                    {Notifications}
                    <li>
                        <a class="text-center col-xs-12" href="#" style={{"paddingTop": "0px !important", "paddingBottom":"0px !important"}}>
                            <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                        </a>
                    </li>
                </div>

                <li class="divider"></li>
                <li class="dropdown-fixed-element">
                    <a class="text-center" href="#">
                        <strong> See All</strong>
                    </a>
                </li>
            </ul>
            {/*<!-- /.dropdown-alerts -->*/}
        </li>

    );
  }
}
