import React from "react"

import TipsterForm from "./tipsterForm/TipsterForm"

export default class TipsterInfo extends React.Component {

    render() {

        const { totalOdd, profit, wins, losses, lastTips} = this.props

        return (
            <div class="col-xs-12 col-sm-4 feed-post-left-container">
                <div class="wrapper">

                    <p>Total odd: {totalOdd}</p>

                    <p>Win-Loss: {wins} - {losses}</p>

                    <TipsterForm lastTips={lastTips}/>

                </div>
            </div>
        )
    }
}
