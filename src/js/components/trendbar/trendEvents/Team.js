import React from "react"

export default class Team extends React.Component {

    render() {

        const { logo, name } = this.props.team

        return (
            <div class="trend-event-team">
                <img src={logo}/>
                <p>{name}</p>
            </div>
        )
    }
}
