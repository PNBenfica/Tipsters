import React from "react"

import TipsterImage from "./TipsterImage"
import Title from "./Title"

export default class TipsterAvatar extends React.Component {

    render() {

        const { date, id, tipster } = this.props
        const { image, name } = tipster

        return (        
            <div class="tipster-avatar">

                <TipsterImage src={image} />

                <Title tipsterName={name} id={id} date={date} />

            </div>
        )
    }
}