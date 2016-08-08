import React from "react";
import classNames from "classnames";

export default class Header extends React.Component {

  render() {

    const {title} = this.props;
    const iconClasses = classNames("fa", "fw", this.props.icon);

    return (
        <div class="panel-heading">
            <h3 class="panel-title">
            	<i class={iconClasses}></i>
            	{title}
            </h3>
        </div>
    );
  }
}
