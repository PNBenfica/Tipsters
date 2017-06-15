import React from "react"

import Panel from "./Panel"
import ParallaxImage from "../../ParallaxImage"
import Section from "../../Section"

export default class Recomendations extends React.Component {

    render() {
    	const { nFollowers, nFollowing, ROI = 0.0 } = this.props

        return (
            <div class="col-xs-12 top-stats">

                <ParallaxImage img={"img/covers/man-running.jpg"} />

            	<Panel icon="fa fa-users" counter={nFollowers} description="Followers" />
            	<Panel icon="fa fa-users" counter={nFollowing} description="Following" />
            	<Panel icon="fa fa-eur" counter={ROI} description="ROI" percentage={true} />

            </div>
        )
    }
}
