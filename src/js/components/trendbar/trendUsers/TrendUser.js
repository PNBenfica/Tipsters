import React from "react"
import {Media} from "react-bootstrap"

import AddUserButton from "./AddUserButton"
import TipsterName from "./TipsterName"

export default class TrendUser extends React.Component {

    render() {

        const { tipster, following, followUser, description } = this.props

        return (
            <div class="trend-user">
                
                <div class="gradient"/>

                <div class="inner-item">
                
                    <img src={tipster.avatar} class="img-thumbnail"/>

                    <TipsterName name={tipster.name} description={description}/>

                    <AddUserButton following={following} followUser={() => followUser(tipster.name)} />

                </div>

            </div>
        )
    }
}
