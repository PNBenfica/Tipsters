import React from "react"

import TipsterForm from "./tipsterForm/TipsterForm"

export default class InfoContainer extends React.Component {

    render() {

        const { totalOdd, profit, wins, losses, lastTips} = this.props

        return (
            <div class="col-xs-12 col-sm-4 feed-post-left-container">
                <div class="wrapper">
                    <p>Total odd: {totalOdd}</p>
                    <p class="divider hidden-xs" />

                    <p>Win-Loss: {wins} - {losses}</p>
                    
                    <p class="divider" />

                    <TipsterForm lastTips={lastTips}/>

                    <p class="divider" />
                </div>
            </div>
        )
    }
}
