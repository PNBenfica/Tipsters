import React from "react"

import Panel from "./../Panel"
import TrendEvent from "./TrendEvent"

export default class TrendEvents extends React.Component {

    render() {

        let { events } = this.props
        
        events = events.map((event, i) => <TrendEvent {...event} key={i}/>)

        return (
            <Panel title="Trends">

                {events}

            </Panel>
        )
    }
}
