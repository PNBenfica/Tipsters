import React from "react"

import TipEventTeam from "./TipEventTeam"

export default class TipEvent extends React.Component {

    render() {

        const { homeTeam, awayTeam, eventURL } = this.props

        return (
            <a href={eventURL} class="event">

                <TipEventTeam name={homeTeam} />

                <span class="hidden-xs">vs</span>

                <TipEventTeam name={awayTeam} />

            </a>
        )
    }
}
