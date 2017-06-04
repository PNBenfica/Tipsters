import React from "react"

import Sport from "./Sport"


export default class SportsList extends React.Component {

    render() {

    const { activeSportCode } = this.props

    const sports = [
        { name: "Football", code: 1, icon: "img/icons.svg#football-ball", img: "img/sports/messi.jpg"},
        { name: "Basketball", code: 2, icon: "img/icons.svg#basket-ball", img: "img/sports/lebron-james.jpg"},
        { name: "Tennis", code: 3, icon: "img/icons.svg#tennis-ball", img: "img/sports/nadal.jpg"}
    ].map((sport,i) => <Sport key={i} {...sport} active={activeSportCode==sport.code} />)

    return (
            <div class="col-xs-12">
                { sports }
            </div>
        )
    }
}
