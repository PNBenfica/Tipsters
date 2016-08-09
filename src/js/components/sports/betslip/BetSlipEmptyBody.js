import React from "react";

import SellingPrice from "./SellingPrice";
import Tip from "./Tip";
import TotalOdd from "./TotalOdd";

export default class BetSlipEmptyBody extends React.Component {

    render() {
        return (     
            <div class="panel-body empty-bet-slip">

                <div class="panel panel-default post-tips">
                    <div class="panel-body">
                      <p>Faça uma seleção para criar o boletim</p>
                    </div>
                </div>
            </div>
        );
    }
}
