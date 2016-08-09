import React from "react";

import SellingPrice from "./SellingPrice";
import Tip from "./Tip";
import TotalOdd from "./TotalOdd";

export default class BetSlipBody extends React.Component {

    render() {

        const {tips} = this.props;
        
        const totalOdd = tips.map(tip => tip.odd).reduce((a,b) => a * b, 1).toFixed(2);

        const Tips = tips.map(({...tip}, i) => <Tip key={i} tipnumber={i+1} {...tip} removeTip={this.props.removeTip}/>);

        return (
            <div class="panel-body">

                {Tips}

                <TotalOdd totalOdd={totalOdd} />

                <SellingPrice updateSellingPrice={this.props.updateSellingPrice}/>

                <div class="form-group">
                    <textarea class="form-control" rows="3" id="bet-slip-comment" placeholder="Add comment"></textarea>
                </div>

                <button type="button" class="btn btn-default btn-sm btn-block">Share Tip</button>

            </div>
        );
    }
}
