import React from "react";

export default class Header extends React.Component {

  render() {

    const {title} = this.props;

    return (
        <div class="panel-heading">
            <h3 class="panel-title">
            	{title}
            </h3>
        </div>
    );
  }
}
