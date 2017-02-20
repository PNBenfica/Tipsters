import React from "react";


export default class TipsterImage extends React.Component {

  render() {

    const {image} = this.props;

    return (

        <span class="chat-img pull-left">
            <img src={image} alt="User Avatar" class="img-circle" />
        </span>

    );
  }
}
