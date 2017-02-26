import React from "react"
import {Media} from "react-bootstrap"

import DropdownItem from "./../DropdownItem"
import Time from "./Time"

export default class NotificationItem extends React.Component {

    render() {

        const { id, date , content , type, tipsterName, tipsterImage, seen, markAsSeen} = this.props
                // <strong>{tipsterName} </strong>{content}
                // <Time date={date} type={type} />

        return (
            <DropdownItem id={id} img={tipsterImage} highlighted={!seen} markAsSeen={markAsSeen}>
                
                <div class="content notification-item">

                	<div>
						<h3>{tipsterName} </h3>{content.substring(0,65)}
                	</div>

                    <Time date={date} type={type}/>
                    
                </div>


            </DropdownItem>
        )
    }
}
