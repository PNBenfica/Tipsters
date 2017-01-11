import React from "react";
import {Media} from "react-bootstrap";

export default class TipsterImage extends React.Component {

  render() {

    const { src } = this.props;

    return (
        <Media.Left>
            <img src={src}></img>
        </Media.Left>
    );
  }
}
