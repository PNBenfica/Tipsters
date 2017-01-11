import React from "react"
import {Media} from "react-bootstrap"

export default class AddUserButton extends React.Component {

  render() {

    const {tipsterName, tipsterImage, description} = this.props

    return (
        <Media.Right>
            <button type="button" class="btn btn-default"><i class="fa fa-user-plus fa-fw"></i></button>
        </Media.Right>
    )
  }
}
