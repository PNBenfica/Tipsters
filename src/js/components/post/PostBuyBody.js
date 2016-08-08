import React from "react";

import InfoContainer from "./InfoContainer";
import TipsToBuyInfo from "./TipsToBuyInfo";

export default class PostBuyBody extends React.Component {

    render() {

        const { totalOdd, selections, price} = this.props;
        const { profit, wins, losses, lastTips } = this.props.tipster;

        return (
            <div class="container-fluid">
                <div class= "row">

                    <InfoContainer lastTips={lastTips} profit={profit} wins={wins} losses={losses} />

                    <TipsToBuyInfo totalOdd={totalOdd} selections={selections} price={price}/>
                                        
                </div>
            </div>
    );
  }
}
