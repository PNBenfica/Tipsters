import React from "react"
import {Media} from "react-bootstrap"
import classNames from "classnames"

import DropdownItemImage from "./DropdownItemImage"

export default class DropdownItem extends React.Component {

  	render() {

	    const {id, img, highlighted, markAsSeen} = this.props
	    const classes = classNames({highlighted: highlighted})

	    return (
	        <li class={classes} onClick={() => markAsSeen(id)}>
	            <Media>

	                <DropdownItemImage img={img}/>

	                <Media.Body>
	                    {this.props.children}
	                </Media.Body>

	            </Media>

	            <div class="divider"></div>
	        </li>
	    )
  	}
}
