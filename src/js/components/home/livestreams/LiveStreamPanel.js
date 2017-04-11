import React from "react"

import SlidePanel from "./../SlidePanel"

export default class LiveStreamPanel extends React.Component {

    render() {

        const { date, tipster, url } = this.props

        return (
            <SlidePanel url={url} img={tipster.avatar}>
            
                <div class="video-icon"><svg><use xlinkHref="img/icons.svg#icon-video" /></svg></div>

                <div class="description col-xs-12">

                    <p>{ date }</p>

                    <h3>{ tipster.name }</h3>

                </div>

            </SlidePanel>
        )
    }

}
