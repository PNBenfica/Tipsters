import React from "react"
import {Media} from "react-bootstrap"
import classNames from "classnames"

export default class DropdownItem extends React.Component {

  	render() {

	    const {id, img, highlighted, markAsSeen} = this.props
	    const classes = classNames({highlighted: highlighted})

	    return (
	        <li class={classes} onClick={() => markAsSeen(id)}>

                <img src={img}/>

                {this.props.children}

	        </li>
	    )
  	}
}
