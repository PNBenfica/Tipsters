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

        this.checkAuthToken(this.props)

    }

    checkAuthToken(props){
        const { history } = this.props



        if (!this.isLoggedIn() && !this.isInLoginPage(this.props)){

            history.pushState(null, '/login')

        }
        else if(this.isLoggedIn() && this.isInLoginPage(props)){

            history.pushState(null, '')

        }
    }

    componentWillReceiveProps(nextProps){
        const currentpath = this.props.location.pathname
        if (currentpath === "/" && currentpath != nextProps.location.pathname){
            this.setState( { animating : true }, this.endAnimationCallback.bind(this))
        }

        this.checkAuthToken(nextProps)
    }

    endAnimationCallback(){
        setTimeout(() => this.setState({ animating : false }), 750)
    }

    isLoggedIn(){
        return localStorage.getItem('access_token') !== null
    }

    isInLoginPage(props){
        return props.location.pathname.startsWith("/login")
    }

    render() {

        const { location } = this.props
        const { animating } = this.state

        const verticalSliderVisible = location.pathname === "/"

        if (!this.isLoggedIn() && this.isInLoginPage(this.props)){
            return this.props.children
        }
        // else if(this.props.location.pathname.startsWith("/login")){
        //     const { history } = this.props
        //     history.pushState(null, '')
        // }

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