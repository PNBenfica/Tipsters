import React from "react"

import Panel from "./../Panel"
import TrendEvent from "./TrendEvent"

export default class TrendEvents extends React.Component {

  render() {

    const TrendEvents = [{homeTeam: {name: "Arsenal", logo: "img/sports/arsenal.png"}, awayTeam: {name: "Liverpool", logo: "img/sports/liverpool.jpg"}, description:"20 tips shared in the last hour", eventUrl:"#/sports/football/1/premier-league/3/arsenal-united/1267076"}, 
                         {homeTeam: {name: "Real Madrid", logo: "img/sports/realmadrid.png"}, awayTeam: {name: "Barcelona", logo: "img/sports/barcelona.png"}, description:"9 tips shared in the last hour", eventUrl:"#/sports/football/1/premier-league/3/arsenal-united/1267076"}]
                        .map((event, i) => <TrendEvent {...event} key={i}/>)

    return (
        <Panel title="Trends">

            {TrendEvents}

        </Panel>
    )
  }
}
