import React from "react";
import {ListGroup, Panel} from "react-bootstrap";

import Header from "./Header";
import TrendEventItem from "./TrendEventItem";

export default class TrendEvents extends React.Component {

  render() {

    const TrendEvents = [{event:"Real Madrid vs Barcelona", description:"20 tips shared in the last hour"}, {event:"Leicester vs Norwich"}, {event:"Bayern Munique vs Benfica"}, {event:"Reading vs Burnley"}, {event:"Federer vs Nadal"}]
                        .map(({event, description}, i) => <TrendEventItem event={event} description={description} key={i}/>);

    return (
        <Panel class="trend-bar-item">

            <Header title="Trends" />

            <ListGroup>
                {TrendEvents}
            </ListGroup>

        </Panel>
    );
  }
}
