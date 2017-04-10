import React from "react"

import Slider from "react-slick"

export default class _Slider extends React.Component {

    render() {

    	const { settings } = this.props

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
        return <div class="edge-holder next"><div class="edge-button next"><svg class="edge-button-path"><use xlinkHref="img/icons.svg#edge-button-path" /></svg></div></div>
    }
}
