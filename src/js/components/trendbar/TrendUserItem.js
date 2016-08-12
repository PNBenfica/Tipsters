import React from "react";
import {Media} from "react-bootstrap";

export default class TrendUserItem extends React.Component {

  render() {

    const {tipsterName, tipsterImage, description} = this.props;

    return (
        <Media class ="col-xs-12 trend-user">

            <Media.Left>
                <a href="#/profile"><img src={tipsterImage} class="img-circle"></img></a>
            </Media.Left>

            <Media.Body class="panel-title">
                <a href="#/profile">{tipsterName}</a>
                <p class="small-text">{description}</p>
                <button type="button" class="btn btn-default"><i class="fa fa-user-plus fa-fw"></i> Follow</button>
            </Media.Body>

        </Media>
    );
  }
}
