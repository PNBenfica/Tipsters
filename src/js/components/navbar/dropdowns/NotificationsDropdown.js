import React from "react";

import DropdownIcon from "./DropdownIcon";
import LoadMoreDropdownItems from "./LoadMoreDropdownItems";
import NotificationItem from "./NotificationItem";

export default class NotificationsDropdown extends React.Component {

  render() {

    const Notifications = [
        { date : "15:11", type : "fa-comment", tipsterImage : "img/joaoalmeida.jpg", tipsterName : "John Smith", content : "e 3 outras pessoas comentaram a tua tip"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "13:53", type : "fa-user", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "começou a seguir-te"        },
        { date : "15:11", type : "fa-thumbs-up", tipsterImage : "img/pauloteixeira.jpg", tipsterName : "John Smith", content : "gostou da tua tip"        }
    ].map(({date, type, tipsterName, tipsterImage, content}, i) => <NotificationItem key={i} date={date} type={type} tipsterName={tipsterName} tipsterImage={tipsterImage} content={content}/> );


    return (
        <li class="dropdown">

            <DropdownIcon icon="fa-bell-o" badge="badge-green" badgeMargin="27px" newItems="5"/>

            <ul class="dropdown-menu dropdown-notifications">
                
                <div class="dropdown-content-container">
                    {Notifications}
                    <LoadMoreDropdownItems />
                </div>

                <li class="divider"></li>
                <li class="dropdown-fixed-element">
                    <a class="text-center" href="#">
                        <strong> See All</strong>
                    </a>
                </li>
            </ul>
        </li>

    );
  }
}
