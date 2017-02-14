import React from "react"

import TipEvent from "./TipEvent"
import TipStatus from "./TipStatus"
import TipRow from "./TipRow"

export default class Tip extends React.Component {

    render() {

        const { selection, event, odd, status } = this.props

        return (
            <div class="tip">

                <TipRow title="Aposta" value={selection}/>

                <TipRow title="Evento" value={<TipEvent event={event}/>}/>

                <TipRow title="Odd" value={odd}/>

                <TipStatus status={status} />

            </div>
        )
    }
}
