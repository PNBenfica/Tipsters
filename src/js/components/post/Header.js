import React from "react";
import {ButtonGroup, Glyphicon, Media} from "react-bootstrap";



export default class Header extends React.Component {

  render() {

    const { tipsterName , tipsterImage , date, likes, comments} = this.props;

    return (        
        <Media class="panel-heading col-xs-12">

            <Media.Left>
                <a href="#/profile"><img src={tipsterImage} class="img-circle"></img></a>
            </Media.Left>

            <Media.Body class="panel-title">
                <a href="#/profile">{tipsterName}</a>
                <p class="small-text"><i class="fa fa-clock-o fa-fw"></i> {date}</p>
            </Media.Body>
            
        </Media>
    );
  }
}
