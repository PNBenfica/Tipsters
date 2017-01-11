import React from "react"
import {Media} from "react-bootstrap"

import TipsterImage from "./TipsterImage"
import Title from "./Title"

export default class Header extends React.Component {

    render() {

        const { date, id, tipsterImage, tipsterName } = this.props

        return (        
            <Media class="panel-heading col-xs-12">

                <TipsterImage src={tipsterImage} />

                <Title tipsterName={tipsterName} id={id} date={date} />

            </Media>
        )
    }
}
