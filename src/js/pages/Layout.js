import React from "react"

import classNames from "classnames"

import BottomChatContainer from "../components/bottomChat/BottomChatContainer"
import NavBar from "../components/navbar/NavBar"
import VerticalSlider from "../components/verticalSlider/VerticalSlider"

export default class Layout extends React.Component {

    constructor(args){
        super(args)
        this.state = { animating : false }
    }

    componentWillMount(){
        if (true){
            const { history } = this.props
            history.pushState(null, '/login')
        }
    }

    componentWillReceiveProps(nextProps){
        const currentpath = this.props.location.pathname
        if (currentpath === "/" && currentpath != nextProps.location.pathname){
            this.setState( { animating : true }, this.endAnimationCallback.bind(this))
        }
    }

    endAnimationCallback(){
        setTimeout(() => this.setState({ animating : false }), 750)
    }

    isLoggedIn(){
        return this.props.location.pathname.startsWith("/login")
    }

    render() {

        const { location } = this.props
        const { animating } = this.state

        const verticalSliderVisible = location.pathname === "/"

        if (this.isLoggedIn()){
            return this.props.children
        }

        return (
            <div id="wrapper">

                <NavBar location={location} inverted={!verticalSliderVisible} />

                <VerticalSlider selected={verticalSliderVisible} />

                <section id="page-wrapper" class={classNames( { selected : !verticalSliderVisible } )}>

                    { (!verticalSliderVisible && !animating) ? this.props.children : null }

                </section>
                
                <BottomChatContainer />

            </div>
        )
    }
}