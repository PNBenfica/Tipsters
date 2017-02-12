import React from "react"

import TipsterAvatar from "./TipsterAvatar"
import TipsterInfo from "./TipsterInfo"

export default class Header extends React.Component {

    render() {

        const { date, id, tipster } = this.props
        const { wins, losses, lastTips } = tipster

        return (        
            <div class="panel-heading">

                <TipsterAvatar tipster={tipster}  id={id} date={date} />

                <TipsterInfo lastTips={lastTips} wins={wins} losses={losses} />

            </div>
        )
    }
}
