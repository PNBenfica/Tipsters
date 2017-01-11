import React from "react"
import {Media} from "react-bootstrap"


export default class TipsterName extends React.Component {

  render() {

    const {name, description} = this.props

    return (
        <Media.Body class="panel-title">
            <p>{name}</p>
            <div class="small-text">{description}</div>
        </Media.Body>
    )
  }
}
