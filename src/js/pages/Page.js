import React from "react"

import classNames from "classnames"

import Breadcrumb from "../components/Breadcrumb"

export default class Page extends React.Component {

	constructor(args){
		super(...args)
		this.state = { loading: true }
	}

	componentDidMount(){
		setTimeout( () => this.setState( { loading : false } ), 750 )
	}

	render() {

		const { id, classes, img, title } = this.props

		let loading = this.props.loading || this.state.loading

	    return (
			<section id={id} class={classNames("col-xs-12 fade-in", classes, { loading } )}>

				<div class="loading-placeholder col-xs-12">
					<picture style={ { backgroundImage: "url(" + img + ")" } } />
					<h2>{ title }</h2>
				</div>
				
				<Breadcrumb />

				<div>
					{ this.props.children }
				</div>

			</section>
	    )
	}

}
