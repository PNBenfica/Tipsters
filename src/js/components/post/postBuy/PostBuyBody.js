import React from "react"

import BuyTipButton from "./BuyTipButton"
import TipDetails from "./TipDetails"

export default class PostBuyBody extends React.Component {

    render() {

        const { totalOdd, selections, price} = this.props

        return (
            <div class="col-xs-12 col-sm-8 feed-post-right-container post-to-buy-body">

                <div class="panel-body post-content">
                
                    <TipDetails totalOdd={totalOdd} selections={selections} price={price}/>

                    <BuyTipButton />

                </div>
                
            </div>
        )
    }
}
