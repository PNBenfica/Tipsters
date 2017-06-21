import React from "react"

import classNames from "classnames"

import Dots from "./Dots"
import Slide from "./Slide"

export default class VerticalSlider extends React.Component {

    constructor(args){
        super(args)
        this.state = { active : 0, prevDotClick: -1 }

        const slides = [
            { title: "Tipsters", description:"Share your tips. Make money.", background: "img/covers/section001.jpg" },
            { title: "News Feed", description:"View the previsions made by other tipsters", href:"#/feed", refTitle:"News Feed", background: "img/covers/section002.jpg" },
            { title: "Share a tip", description:"Browse through the sport events available and share a tip", href:"#/sports", refTitle:"Share a tip", background: "img/covers/section003.jpg" },
            { title: "Rankings", description:"Find the best tipsters to help you become more profitable", href:"#/rankings", refTitle:"Rankings", background: "img/covers/section004.jpg" }
        ]

        this.slides = slides
        this.nSlides = slides.length
        this.slidesTitles = slides.map(slide => slide.title)

        document.addEventListener('wheel', this.handleWheel.bind(this));
        document.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        window.addEventListener('keydown', this.handleKeyDown.bind(this));

    }

    handleWheel(e){
        const deltaY = e.deltaY
        if(deltaY > 0) {
            this.slideUp()
        }
        else {
            this.slideDown()
        }
    }

    handleTouchStart(e){
        this.ts = e.touches[0].clientY;
    }

    handleTouchEnd(e){
        var te = e.changedTouches[0].clientY;
        if(this.ts > te+5) {
            this.slideUp()
        }
        else if(this.ts < te-5) {
            this.slideDown()
        }
    }

    slideUp(){
        const active = this.state.active
        if (active < this.nSlides - 1) {
            this.setActiveSlide(active + 1)
        }
    }

    slideDown(){
        const active = this.state.active
        if (active > 0) {
            this.setActiveSlide(active - 1)
        }
    }

    setActiveSlide(active, prevDotClick = -1){
        if (!this.animating && this.props.selected) {
            this.animating = true
            this.setState({ active, prevDotClick }, this.animationEnd.bind(this) )
        }
    }

    animationEnd(){
        setTimeout( () => this.animating = false, 1000 )
    }

    onDotClick(dotNumber){
        const active = this.state.active
        if (active > dotNumber - 1)
            this.setActiveSlide(dotNumber, active)
        else
            this.setActiveSlide(dotNumber, active)
    }

    handleKeyDown(e){
        if (e.which == 40)
            this.slideUp()
        else if (e.which == 38)
            this.slideDown()
    }

    render() {

        const { active, prevDotClick } = this.state
        const { selected } = this.props

        const slides = this.slides.map((slide, i) => <Slide key={i} {...slide} active={active==i} next={active==i-1} prevDotClick={prevDotClick==i} /> )

        return (
            <section id="vertical-slider" class={classNames({ selected })} >

                { slides }

                <Dots n={this.nSlides} tooltipsData={this.slidesTitles} onDotClick={this.onDotClick.bind(this)} active={active} />

            </section>
        )
    }
}
