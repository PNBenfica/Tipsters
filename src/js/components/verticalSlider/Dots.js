import React from "react"

import Dot from "./Dot"

export default class Dots extends React.Component {

    render() {

        const { active, n, onDotClick, tooltipsData } = this.props

        const dots = [...Array(n).keys()].map((n,i) =>  <Dot key={i} active={i == active} hoverText={tooltipsData[i]} onClick={() => onDotClick(i)} /> )

        return (
            <div class="dots">
            
                {dots}

            </div>
        )
    }
}
