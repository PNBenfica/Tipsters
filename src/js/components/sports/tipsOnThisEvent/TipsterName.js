import React from "react";


export default class Tipstername extends React.Component {

  render() {

    const {name} = this.props;

    return (
    	<strong class="primary-font">{name}</strong>
    );
  }
}
