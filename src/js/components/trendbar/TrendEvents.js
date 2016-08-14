import React from "react";
import {Panel} from "react-bootstrap";

import Header from "./Header";
import TrendEventItem from "./TrendEventItem";

export default class TrendEvents extends React.Component {

  render() {

    const TrendEvents = [{homeTeam: {name: "Arsenal", logo: "img/sports/arsenal.png"}, awayTeam: {name: "Liverpool", logo: "img/sports/liverpool.jpg"}, description:"20 tips shared in the last hour"}, 
                         {homeTeam: {name: "Real Madrid", logo: "img/sports/realmadrid.png"}, awayTeam: {name: "Barcelona", logo: "img/sports/barcelona.png"}, description:"9 tips shared in the last hour"}]
                        .map(({...event}, i) => <TrendEventItem {...event} key={i}/>);

    return (
        <Panel class="trend-bar-item">

            <Header title="Trends" />

            <div class="trend-events-container">
                {TrendEvents}
            </div>

        </Panel>
    );
  }
}
