import React from "react"

import classNames from "classnames"

import Breadcrumb from "../components/Breadcrumb"
import LoadingGif from "../components/LoadingGif"
import ParallaxImage from "../components/ParallaxImage"

export default class Page extends React.Component {

	constructor(args){
		super(...args)
		this.state = { loading: true }
	}

	componentDidMount(){
		setTimeout( () => this.setState( { loading : false } ), 750 )
	}

	render() {

		const { id, classes, img, title, customHeader } = this.props

		let loading = this.props.loading || this.state.loading

		const header = customHeader || ( <h2>{ title }</h2> )

	    return (
			<section id={id} class={classNames("col-xs-12 fade-in", classes, { loading } )} >

				<div class="loading-placeholder col-xs-12">
					<ParallaxImage img={img} />
					{ header }
					<div class={classNames("loading-gif-container", {loading: this.props.loading})}><LoadingGif /></div>
				</div>
				
				<Breadcrumb title={title} />

				<div class="col-xs-12">
					{ this.props.children }
				</div>

			</section>
	    )
	}

}
