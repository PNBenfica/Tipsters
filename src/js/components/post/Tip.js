import React from "react"

import EventURL from "./../sports/EventURL"
import TipEvent from "./TipEvent"
import TipStatus from "./TipStatus"
import TipRow from "./TipRow"

export default class Tip extends React.Component {

    render() {

        const { betName, choiceName, leagueName, leagueId, matchName, matchId, odd, sportName, sportId, status } = this.props
        
        const eventURL = new EventURL({name: sportName, id: sportId}, {name: leagueName, id: leagueId}, {name: matchName, id: matchId})

        return (
            <div class="tip">

                <TipRow title="Bet" value={betName + ": " + choiceName}/>

                <TipRow title="Event" value={<TipEvent event={matchName} eventURL={eventURL.renderPath()} />}/>

                <TipRow title="Odd" value={odd}/>

                <TipStatus status={status} />

            </div>
        )
    }
}
