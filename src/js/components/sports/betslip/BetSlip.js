import React from "react";

import BetSlipBody from "./BetSlipBody";
import BetSlipEmptyBody from "./BetSlipEmptyBody";

export default class BetSlip extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
                        tips: [],
                        sellingPrice : 0
                    };
    }

    updateSellingPrice(sellingPrice){
        this.setState({sellingPrice});
    }

    addTip(selection, event, odd){
        if (this.state.tips.length < 14){
            this.state.tips = [ ...this.state.tips, {selection, event, odd}];
            this.setState({tips: this.state.tips});
        }
    }

    removeTip(index){
        this.setState({
            tips: this.state.tips.filter((_, i) => i !== index)
        });
    }

    render() {

        var betSlipBody;
        if (this.state.tips.length === 0) {
            betSlipBody = <BetSlipEmptyBody />;
        } 
        else {
            betSlipBody = <BetSlipBody tips={this.state.tips} removeTip={this.removeTip.bind(this)} updateSellingPrice={this.updateSellingPrice.bind(this)}/>;
        }

        return (
            <div id="bet-slip">
                <div class="panel">
                    <div class="panel-heading" onClick={this.addTip.bind(this, "Benfica", "Benfica vs Arouca", "1.33")}>
                        <h3 class="panel-title"><i class="fa fa-list-alt fa-fw"></i> Boletim</h3>  
                    </div>

                    {betSlipBody}
                </div> 
            </div>
        );
    }
}
