import React from "react"

import Section from "../Section"
import Slider from "../Slider"

export default class ShareATipSection extends React.Component {

    render() {

        var responsive = [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }];
        const settings = {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: false,
            speed: 1000,adaptiveHeight: false,
            mobileFirst: true,
            outerEdgeLimit: true,
            responsive: responsive
        }

        return (
            <Section title="Share a Tip">

                <Slider settings={settings}>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                    <div><h3>5</h3></div>
                    <div><h3>6</h3></div>
                </Slider>

            	
            </Section>
        )
    }

}
