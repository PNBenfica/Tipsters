import React from "react";

import Section from "../../Section"
import Slider from "../../home/Slider"
import TipsterPanel from "./TipsterPanel"

export default class UserSlide extends React.Component {

    constructor(args){
        super(args)
        this.state = { rendering : false }
    }

    componentDidMount(){
        setTimeout( () => this.setState({ rendering: true }) , 1000 )
    }

    renderSlider(tipsters){
        
        if (tipsters.length === 0) return []

        tipsters = tipsters.map((tipster,i) => <div key={i}><TipsterPanel {...tipster} /></div>)

        console.log(tipsters)

        return (
            <Slider>
                { tipsters }
            </Slider>
        )
    }

    render() {

    	const { tipsters = [], title } = this.props
        const { rendering } = this.state

        if (!rendering) return null

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
