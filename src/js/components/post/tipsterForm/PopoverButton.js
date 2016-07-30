import React from "react";
import {OverlayTrigger} from "react-bootstrap";

var classNames = require('classnames');


export default class PopoverButton extends React.Component {

  render() {

    const {status, popover} = this.props;
    const btnClasses = classNames('btn', 'btn-xs', 'btn-default', {'my-sucess-button': status === 'win' }, {'my-fail-button': status === 'lost' });
    const btnText = (status === 'win') ? 'V' : 'D';

    return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
            <button type="button" className={btnClasses}>{btnText}</button>
        </OverlayTrigger>
    );
  }
}
