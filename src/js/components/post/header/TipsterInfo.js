import React from "react"

import TipsterForm from "./tipsterForm/TipsterForm"
import TipsterRanking from "./TipsterRanking"
import TipsterWinLosses from "./TipsterWinLosses"

export default class TipsterInfo extends React.Component {

    render() {

        const { wins, losses, lastTips} = this.props

        return (
            <div class="tipster-info">

                <TipsterForm lastTips={lastTips}/>

                <TipsterRanking />

                <TipsterWinLosses wins={wins} losses={losses} />

            </div>
        )
    }
}
