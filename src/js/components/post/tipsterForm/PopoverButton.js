import React from "react";
import classNames from "classnames";
import {OverlayTrigger} from "react-bootstrap";

export default class PopoverButton extends React.Component {

  render() {

    const {status, popover} = this.props;
    const btnClasses = classNames('btn', 'btn-xs', 'btn-default', {'my-sucess-button': status === 'win' }, {'my-fail-button': status === 'lost' });
    const btnText = (status === 'win') ? '✔' : 'X';

    return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
            <button type="button" className={btnClasses}>{btnText}</button>
        </OverlayTrigger>
    );
  }
}
