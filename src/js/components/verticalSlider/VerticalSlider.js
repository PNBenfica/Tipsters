import React from "react"

import Dots from "./Dots"
import Slide from "./Slide"

export default class VerticalSlider extends React.Component {

    constructor(args){
        super(args)
        this.state = { active : 0, prevDotClick: -1 }
        this.nSlides = 3

        document.addEventListener('wheel', this.handleWheel.bind(this));
        document.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));

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
        if (!this.animating) {
            this.animating = true
            this.setState({ active, prevDotClick }, this.animationEnd.bind(this) )
        }
    }

    animationEnd(){
        setTimeout( () => this.animating = false, 1000 )
    }

    onDotClick(dotNumber){
        const active = this.state.active
        if (active < dotNumber - 1)
            this.setActiveSlide(dotNumber, active)
        else
            this.setActiveSlide(dotNumber)
    }

    render() {

        const { active, prevDotClick } = this.state
        console.log(prevDotClick)

        return (
            <section id="vertical-slider">

                <Slide active={active==0} next={false} prevDotClick={prevDotClick==0} background={"img/home/section1.jpg"} title="Slide 1" />

                <Slide active={active==1} next={active==0} prevDotClick={prevDotClick==1} background={"img/home/section2.jpg"} title="Slide 2" />

                <Slide active={active==2} next={active==1} prevDotClick={prevDotClick==2} background={"img/home/section3.jpg"} title="Slide 3" />

                <Dots n={this.nSlides} tooltipsData={["Slide 1", "Slide 2", "Slide 3"]} onDotClick={this.onDotClick.bind(this)} active={active} />

            </section>
        )
    }
}
