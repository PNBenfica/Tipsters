import React from "react"

import Slider from "react-slick"

export default class _Slider extends React.Component {

    render() {

    	const { settings = this.defaultSettings() } = this.props

        return (
            <Slider {...settings} prevArrow={this.renderPrevArrow()} nextArrow={this.renderNextArrow()}>

            	{ this.props.children }
            	
            </Slider>
        )
    }


    renderPrevArrow(){
        return <div class="edge-holder previous"><svg class="edge-button-path"><use xlinkHref="img/icons.svg#edge-button-path" /></svg></div>
    }
    renderNextArrow(){
        return <div class="edge-button next"><svg class="edge-button-path"><use xlinkHref="img/icons.svg#edge-button-path" /></svg></div>
    }

    defaultSettings(){
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
            speed: 1000,
            adaptiveHeight: false,
            mobileFirst: true,
            outerEdgeLimit: true,
            responsive: responsive
        }
        return settings
    }
}
