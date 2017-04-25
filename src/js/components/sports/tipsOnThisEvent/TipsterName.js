import React from "react"


export default class Tipstername extends React.Component {

  	render() {

    	const {name} = this.props

	    return (
	    	<h5>{name}</h5>
	    )
  	}
}
