import React from "react"

import PostDate from "./PostDate"
import TipsterName from "./TipsterName"

export default class Header extends React.Component {

    render() {

        const { date, id, tipster } = this.props

        return (        
            <header>

                <TipsterName name={tipster.name} />
                
                <PostDate id={id} date={date}/>

            </header>
        )
    }
}
