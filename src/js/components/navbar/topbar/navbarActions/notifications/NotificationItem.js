import React from "react"
import {Media} from "react-bootstrap"

import DropdownItem from "./../DropdownItem"
import Time from "./Time"

export default class NotificationItem extends React.Component {

    /*
    * @return the icon of the notification based on its type
    */
    notificationIcon(notificationType){

        /**
         * Map bettewen the notification type and the notification icon
         */
        const types = {
            'LIKE': 'fa-thumbs-up',
            'COMMENT': 'fa-comment',
            'FOLLOW': 'fa-user'
        }

        return types[notificationType]

    }

    render() {


        const { id, date , content , type, tipster, url, seen, markAsSeen} = this.props
        const icon = this.notificationIcon(type)

        return (
            <a href={url}>
            
                <DropdownItem id={id} img={tipster.avatar} highlighted={!seen} markAsSeen={markAsSeen}>
                    
                    <div class="content notification-item">

                    	<div>
    						<h3>{tipster.name} </h3>{content.substring(0,65)}
                    	</div>

                        <Time date={date} icon={icon}/>
                        
                    </div>

                </DropdownItem>
            </a>
        )
    }
}
