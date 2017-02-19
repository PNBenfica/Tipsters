import React from "react";
import classNames from "classnames"

import SellingPrice from "./SellingPrice";
import Tip from "./Tip";
import TotalOdd from "./TotalOdd";

export default class BetSlipBody extends React.Component {

    render() {

        const { tips, expanded } = this.props;
        
        const totalOdd = tips.map(tip => tip.choice.odd).reduce((a,b) => a * b, 1).toFixed(2);

        const Tips = tips.map(({...tip}, i) => <Tip key={i} tipnumber={i+1} {...tip} removeTip={this.props.removeTip}/>);

        return (
            <div class="panel-body">

                <div class="bet-slip-tips-container">
                    {Tips}
                </div>

                <div class={classNames("bet-slip-actions", {expanded})}>

                    <TotalOdd totalOdd={totalOdd} />

                    <SellingPrice updateSellingPrice={this.props.updateSellingPrice}/>

                    <div class="form-group">
                        <textarea class="form-control" rows="3" id="bet-slip-comment" placeholder="Add comment"></textarea>
                    </div>

                    <button onClick={() => this.props.shareTip()} type="button" class="btn btn-default btn-sm btn-block">Share Tip</button>

                </div>
            </div>
        );
    }
}
