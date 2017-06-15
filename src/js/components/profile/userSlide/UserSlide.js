import React from "react";

import Section from "../../Section"
import Slider from "../../home/Slider"
import TipsterPanel from "./TipsterPanel"

export default class UserSlide extends React.Component {

    renderSlider(tipsters){
        
        if (tipsters.length === 0) return []

        tipsters = tipsters.map((tipster,i) => <div key={i}><TipsterPanel {...tipster} /></div>)

        return (
            <Slider>
                { tipsters }
            </Slider>
        )
    }

    render() {

    	const { tipsters = [], title } = this.props


        const Slider = this.renderSlider(tipsters)

        return (
            <div class="col-xs-12">

                <Section title={title} classes="profile-followers-section card-slide">

	                { Slider }
                    
                </Section>

            </div>
        );
    }
}
