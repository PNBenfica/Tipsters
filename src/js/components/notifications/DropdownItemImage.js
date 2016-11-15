import React from "react";

export default class DropdownItemImage extends React.Component {

  render() {

    const {img} = this.props;

    return (
        <a class="media-left" href="#">
            <img class="media-object" src={img} class="img-rounded"/>
        </a>
    );
  }
}
