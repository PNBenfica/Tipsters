import React from "react"
import {Media} from "react-bootstrap"

import AddUserButton from "./AddUserButton"
import TipsterImage from "./TipsterImage"
import TipsterName from "./TipsterName"

export default class TrendUser extends React.Component {

  render() {

    const {tipsterName, tipsterImage, description} = this.props

    return (

        <div class="panel">
            <a href="#/profile">
                <div class="row">

                    <Media class="trend-user col-xs-12">
                        
                        <TipsterImage src={tipsterImage} />

                        <TipsterName name={tipsterName} description={description}/>

                        <AddUserButton />

                    </Media>

                </div>
            </a>
        </div>
    )
  }
}
