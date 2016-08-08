import React from "react";

import {Media} from "react-bootstrap";

export default class Comment extends React.Component {

  render() {

    const { tipsterName, tipsterImage, date, comment} = this.props;

    return (

        <Media>

            <Media.Left>
                <a href="#"><img src={tipsterImage}></img></a>
            </Media.Left>

            <Media.Body>
                <a href="#">{tipsterName} <small><i class="fa fa-clock-o fa-fw"></i> {date}</small></a>
                <p>{comment}</p>            
            </Media.Body>
            
        </Media>
    );
  }
}
