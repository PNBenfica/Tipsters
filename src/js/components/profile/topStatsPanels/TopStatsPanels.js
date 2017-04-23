import React from "react"

import Panel from "./Panel"
import Section from "../../Section"

export default class Recomendations extends React.Component {

    render() {
    	const { nFollowers, nFollowing } = this.props

        return (
            <div class="col-md-6 top-stats">

            	<Panel icon="fa fa-users" counter={nFollowers} description="Followers" />
            	<Panel icon="fa fa-users" counter={nFollowing} description="Following" />
            	<Panel icon="fa fa-eur" counter={5.41} description="ROI" percentage={true} />

            </div>
        )
    }
}
