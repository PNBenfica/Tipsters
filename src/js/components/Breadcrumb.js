import React from "react"
import classNames from "classnames"

export default class Breadcrumb extends React.Component {


  	render() {

	    let { location } = this.props

	    return (
	        <ol class={ classNames("breadcrumb", "col-xs-12") }>
	        	<li><a href={"#"}>Home</a></li>
	        	<li class="active">Feed</li>
	        </ol>
	    )
  	}
}
