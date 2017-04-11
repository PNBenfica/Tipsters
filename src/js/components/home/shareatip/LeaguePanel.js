import React from "react"

import SlidePanel from "./../SlidePanel"

export default class LeaguePanel extends React.Component {

    render() {

        const { name, url, img } = this.props

        return (
            <SlidePanel url={url} img={img}>
            
                <div class="red-layer"></div>
                <div class="black-layer"></div>

                <div class="league-name">
                    <h2>{ name }</h2>
                </div>

            </SlidePanel>
        )
    }

}
