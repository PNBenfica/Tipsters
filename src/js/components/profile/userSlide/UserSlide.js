import React from "react";

import Section from "../../Section"
import Slider from "../../home/Slider"
import TipsterPanel from "./TipsterPanel"

export default class UserSlide extends React.Component {

    render() {

    	let { tipsters, title } = this.props

        tipsters = tipsters.map((tipster,i) => <div key={i}><TipsterPanel {...tipster} /></div>)

        return (
            <div class="col-xs-12">
                <Section title={title} classes="profile-followers-section card-slide">

	                <Slider>
	                    { tipsters }
	                </Slider>
                    
                </Section>
            </div>
        );
    }
}
