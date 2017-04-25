import React from "react"


export default class TipsterImage extends React.Component {

  	render() {

    	const {image} = this.props

	    return (
	        <img src={image} />
	    )
  	}
}
