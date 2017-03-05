import React from "react"
import {Media} from "react-bootstrap"

import AddUserButton from "./AddUserButton"
import TipsterName from "./TipsterName"

export default class TrendUser extends React.Component {

    render() {

        const {tipsterName, tipsterImage, description} = this.props

        return (
            <div class="trend-user">
                
                <div class="gradient"/>

                <div class="inner-item">
                
                    <img src={tipsterImage} class="img-thumbnail"/>

                    <TipsterName name={tipsterName} description={description}/>

                    <AddUserButton />

                </div>

            </div>
        )
    }
}
