import React from "react"
import {Media} from "react-bootstrap"

import PostDate from "./PostDate"
import TipsterName from "./TipsterName"

export default class Title extends React.Component {

    render() {

        const { id, date, tipsterName } = this.props

        return (        
            <Media.Body class="panel-title">

                <TipsterName name={tipsterName}/>
                
                <PostDate id={id} date={date}/>

            </Media.Body>
        )
    }
}
