import React from "react";
import classNames from "classnames";

// represents a single odd option that can be added to the betsli+
export default class Choice extends React.Component {

  	render() {

        const { eventURL, bet, choice, classes, addTip, isInBetSlip } = this.props

	    return (
            <a onClick={() => addTip(eventURL, bet, choice)} class={classNames(classes, {highlighted : isInBetSlip(eventURL, bet, choice)})}>{this.props.children}</a>
	    );
  	}
}
