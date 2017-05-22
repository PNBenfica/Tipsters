import React from "react"

import classNames from "classnames"

import BottomChatContainer from "../components/bottomChat/BottomChatContainer"
import Breadcrumb from "../components/Breadcrumb"
import LoadingGif from "../components/LoadingGif"
import NavBar from "../components/navbar/NavBar"
import VerticalSlider from "../components/verticalSlider/VerticalSlider"

export default class Layout extends React.Component {

    constructor(args){
        super(args)
        this.state = { animating : false, loading: true }
    }

    componentWillReceiveProps(nextProps){
        const currentpath = this.props.location.pathname
        if (currentpath === "/" && currentpath != nextProps.location.pathname){
            this.setState( { animating : true }, this.endAnimationCallback.bind(this))
        }
        else{
            this.setState( { loading : true } )
        }
    }

    endAnimationCallback(){
        setTimeout(() => this.setState({ animating : false }), 3000)
    }

    onLoad(){
        this.setState({ loading : false })
    }

    render() {

        const { location } = this.props
        const { animating, loading } = this.state

        const verticalSliderVisible = location.pathname === "/"

        return (
            <div id="wrapper">

                <NavBar location={location} inverted={!verticalSliderVisible} />

                <VerticalSlider selected={verticalSliderVisible} />

                <section id="page-wrapper" class={classNames( { selected : !verticalSliderVisible } )}>

                    <Breadcrumb />

                    { (!verticalSliderVisible && loading) ? <LoadingGif/> : null }

                    { (!verticalSliderVisible && !animating) ? this.HOC(this.props.children, this.onLoad.bind(this)) : null }

                </section>
                
                <BottomChatContainer />

            </div>
        )
    }


    HOC(WrappedComponent, onLoadCallback) {
        return (
            <div>
                {React.cloneElement(this.props.children, { onLoad: onLoadCallback })}
            </div>
        )
        // return class extends React.Component {

        //     render() {
        //         return <WrappedComponent {...this.props} onLoad={onLoadCallback} />
        //     }
        // }
    }

}

