import React from "react";

import classNames from "classnames"

import BetSlipBody from "./BetSlipBody";
import BetSlipEmptyBody from "./BetSlipEmptyBody";
import FixedPagePanel from "./FixedPagePanel"

export default class BetSlip extends React.Component {

    render() {

        const {tips, removeTip, updateSellingPrice, setBetSlipComment,shareTip, expanded} = this.props;

        var betSlipBody;
        if (tips.length === 0) {
            betSlipBody = <BetSlipEmptyBody />;
        } 
        else {
            betSlipBody = <BetSlipBody tips={tips} removeTip={removeTip} expanded={expanded} updateSellingPrice={updateSellingPrice} setBetSlipComment={setBetSlipComment} shareTip={shareTip}/>;
        }

        return (
            <FixedPagePanel id="bet-slip" active={tips.length > 0} icon="list-icon" iconNumber={tips.length}>

                { betSlipBody }

            </FixedPagePanel>
        )
    }
}
