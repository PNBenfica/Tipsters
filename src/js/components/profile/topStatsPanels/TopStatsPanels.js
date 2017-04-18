import React from "react"

import Panel from "./Panel"
import Section from "../../Section"

export default class Recomendations extends React.Component {

    render() {
    	const { nFollowers } = this.props

        return (
            <div class="col-md-6 top-stats">

            	<Panel icon="fa fa-users" counter={10} description="Followers" />
            	<Panel icon="fa fa-users" counter={16} description="Followers" />
            	<Panel icon="fa fa-eur" counter={5.41} description="ROI" percentage={true} />

            </div>
        )
    }
}
