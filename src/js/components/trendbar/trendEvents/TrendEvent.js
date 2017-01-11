import React from "react"

import Description from './Description'
import Team from './Team'

export default class TrendEvent extends React.Component {

    render() {

        const {homeTeam, awayTeam, description, eventUrl} = this.props

        return (
            <div class="panel trend-event">
                <a href={eventUrl}>
                    <Team team={homeTeam} />
                    <Team team={awayTeam} />
                    <Description description={description} />
                </a>
            </div>
        )
    }
}
