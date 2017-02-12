import React from "react"

export default class TipsterWinLosses extends React.Component {

    render() {

        const { wins, losses } = this.props

        return (
            <div class="win-losses">
                <img src="img/ranking.png" />
                {wins}W-{losses}L
            </div>
        )
    }
}
