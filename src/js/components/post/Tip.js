import React from "react"

import EventURL from "./../sports/EventURL"
import TipEvent from "./TipEvent"
import TipStatus from "./TipStatus"
import TipRow from "./TipRow"

export default class Tip extends React.Component {

    renderChoiceName(choiceName, homeTeam, awayTeam){
        choiceName = choiceName.replace("%1%", homeTeam)
        choiceName = choiceName.replace("%2%", awayTeam)
        return choiceName
    }

    render() {

        const { betName, leagueName, leagueId, matchName, matchId, odd, sportName, sportId, status } = this.props
        
        const eventURL = new EventURL({name: sportName, id: sportId}, {name: leagueName, id: leagueId}, {name: matchName, id: matchId})
        
        const [ homeTeam, awayTeam ] = matchName.split(' - ')
        const choiceName = this.renderChoiceName(this.props.choiceName, homeTeam, awayTeam)

        return (
            <div class="tip">

                <TipRow title="Bet" value={betName + ": " + choiceName}/>

                <TipRow title="Event" value={<TipEvent homeTeam={homeTeam} awayTeam={awayTeam} eventURL={eventURL.renderPath()} />}/>

                <TipRow title="Odd" value={odd.toFixed(2)}/>

                <TipStatus status={status} />

            </div>
        )
    }
}
