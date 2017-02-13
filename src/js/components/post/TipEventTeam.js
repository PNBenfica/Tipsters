import React from "react"

export default class TipEventTeam extends React.Component {

    render() {

        const { name, img } = this.props

        return (
            <div class="team">
                <img src={img}/>
                {name}
            </div>
        )
    }
}
