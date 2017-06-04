import React from "react"

import classNames from "classnames"

import Breadcrumb from "../components/Breadcrumb"
import LoadingGif from "../components/LoadingGif"

export default class Page extends React.Component {

	constructor(args){
		super(...args)
		this.state = { loading: true, backgroundPositionY : 0 }

		this.handleScroll = this.handleScroll.bind(this)
	}

	componentDidMount(){
		setTimeout( () => this.setState( { loading : false } ), 750 )
        window.addEventListener("scroll", this.handleScroll)
	}

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll() {
    	const backgroundPositionY = -document.body.scrollTop/5
    	this.setState({ backgroundPositionY })
    }

	render() {

		const { id, classes, img, title } = this.props
		const { backgroundPositionY } = this.state

		let loading = this.props.loading || this.state.loading

	    return (
			<section id={id} class={classNames("col-xs-12 fade-in", classes, { loading } )} >

				<div class="loading-placeholder col-xs-12">
					<picture style={ { backgroundImage: "url(" + img + ")", backgroundPositionY: backgroundPositionY + "px" } } />
					<h2>{ title }</h2>
					<div class={classNames("loading-gif-container", {loading: this.props.loading})}><LoadingGif /></div>
				</div>
				
				<Breadcrumb title={title} />

				<div>
					{ this.props.children }
				</div>

			</section>
	    )
	}

}
