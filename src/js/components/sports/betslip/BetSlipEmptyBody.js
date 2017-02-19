import React from "react";

import SellingPrice from "./SellingPrice";
import Tip from "./Tip";
import TotalOdd from "./TotalOdd";

export default class BetSlipEmptyBody extends React.Component {


    render() {
        return (     
            <div class="panel-body empty-bet-slip">

                <div class="panel panel-default post-tips expanded">
                    <div class="panel-body">
                      <p><strong>No bets selected </strong>yet. To add a bet click the odds while browsing through Tipsters!</p>
                    </div>
                </div>
            </div>
        );
    }
}
