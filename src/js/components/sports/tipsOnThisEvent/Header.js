import React from "react"

import TipsterImage from "./TipsterImage"
import TipsterName from "./TipsterName"

export default class Header extends React.Component {

    render() {

        const { tipster } = this.props

        return (
            <header class="col-xs-12">

                <a href={"#/" + tipster.name} >
            
                    <TipsterImage image={tipster.avatar} />

                    <TipsterName name={tipster.name}/>

                </a>
            </header>
        )
    }
}
