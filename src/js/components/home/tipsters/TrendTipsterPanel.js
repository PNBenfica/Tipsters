import React from "react"

import SlidePanel from "./../SlidePanel"

export default class TrendTipsterPanel extends React.Component {

    render() {

        const { date, tipster, url } = this.props

        return (
            <SlidePanel url={"javascript:void(0)"} img={tipster.avatar}>
            
                <div class="hover-icon"><svg><use xlinkHref="img/icons.svg#add-user-icon" /></svg></div>

                <div class="description col-xs-12">

                    <a href={"#/profile/" + tipster.name} class="col-xs-12">

                        <p>{ date }</p>

                        <h3>{ tipster.name }</h3>

                    </a>

                </div>

            </SlidePanel>
        )
    }

}
