import React from "react";
import classNames from "classnames";

// represents a single odd option that can be added to the betsli+
export default class ChoiceTD extends React.Component {

  	render() {

        const { eventURL, bet, choice, classes, addTip, isInBetSlip, maxLength } = this.props

	    return (
            <td onClick={() => addTip(eventURL, bet, choice)} class={classNames(classes, {highlighted : isInBetSlip(eventURL, bet, choice)}, {bigger : maxLength > 25})}>{this.props.children}</td>
	    );
  	}
}
