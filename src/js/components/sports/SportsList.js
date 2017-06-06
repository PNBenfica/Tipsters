import React from "react"

import SquaresList from "./SquaresList"


export default class SportsList extends React.Component {

    render() {

    const { activeSportCode } = this.props

    const sports = [
        { name: "Football", code: 1, icon: "img/icons.svg#football-ball", img: "img/sports/messi.jpg", url:"#/sports/Football/1"},
        { name: "Basketball", code: 4, icon: "img/icons.svg#basket-ball", img: "img/sports/lebron-james.jpg", url:"#/sports/Basketball/4"},
        { name: "Tennis", code: 2, icon: "img/icons.svg#tennis-ball", img: "img/sports/nadal.jpg", url:"#/sports/Tennis/2"}
    ]

    return (
            <SquaresList items={sports} activeCode={activeSportCode} />
        )
    }
}
