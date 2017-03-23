import React from "react"

import TipEventTeam from "./TipEventTeam"

export default class TipEvent extends React.Component {

    render() {

        const { event, eventURL } = this.props

        const [ homeTeam, awayTeam ] = event.split(' - ')

        return (
            <a href={eventURL} class="event">

                <TipEventTeam name={homeTeam} img="img/sports/arsenal.png"/>

                <span class="hidden-xs">vs</span>

                <TipEventTeam name={awayTeam} img="img/sports/liverpool.jpg"/>

            </a>
        )
    }
}
