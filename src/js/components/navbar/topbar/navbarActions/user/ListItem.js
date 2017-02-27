import React from "react"

export default class ListItem extends React.Component {

    render() {

        const { title, href, icon } = this.props

        return (
        	<a href={href}>
	            <li>
	                <i class={icon}></i>
	                <h2>{title}</h2>
	            </li>
	        </a>
        )
    }
}
