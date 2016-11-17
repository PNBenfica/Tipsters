import React from "react"
import {Media} from "react-bootstrap"

import DropdownItem from "./../navbar/navbarTopLinks/dropdowns/DropdownItem"
import Time from "./Time"

export default class NotificationItem extends React.Component {

    render() {

        const { id, date , content , type, tipsterName, tipsterImage, seen, markAsSeen} = this.props

        return (
            <DropdownItem id={id} img={tipsterImage} highlighted={!seen} markAsSeen={markAsSeen}>

                <strong>{tipsterName} </strong>{content}
                <Time date={date} type={type} />

            </DropdownItem>
        )
    }
}
