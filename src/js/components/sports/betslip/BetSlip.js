import React from "react";

import BetSlipBody from "./BetSlipBody";
import BetSlipEmptyBody from "./BetSlipEmptyBody";
import Section from "./../../Section"

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
            <Section id="bet-slip" title="Betslip" >

                {betSlipBody}

            </Section>
        );
    }
}
