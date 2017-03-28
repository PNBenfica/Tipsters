import React from "react";

import BetSlipBody from "./BetSlipBody";
import BetSlipEmptyBody from "./BetSlipEmptyBody";

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
            <div id="bet-slip">
                <div class="panel-heading">
                    <h3 class="panel-title"><i class="fa fa-list-alt fa-fw"></i> Boletim</h3>  
                </div>

                {betSlipBody}
            </div>
        );
    }
}
