import React from "react";
import classNames from "classnames";

export default class DropdownIcon extends React.Component {

  render() {

    const {icon, badge, badgeMargin, newItems} = this.props;
    const iconClass = classNames("fa", "fa-fw", icon);
    const badgeClass = classNames("font-awesome-badge", badge);

    return (
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            <i class={iconClass}><span style={{"right":badgeMargin}} class={badgeClass}>{newItems}</span></i>
        </a>
    );
  }
}
