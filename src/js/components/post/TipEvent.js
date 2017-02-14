import React from "react"

import TipEventTeam from "./TipEventTeam"

export default class TipEvent extends React.Component {

    render() {

        const { event } = this.props

        return (
            <a href="#/sports" class="event">
                <TipEventTeam name="America de Cali" img="img/sports/arsenal.png"/>

                <span>vs</span>

                <TipEventTeam name="Rionegro Aguilas" img="img/sports/liverpool.jpg"/>
            </a>
        )
    }
}
