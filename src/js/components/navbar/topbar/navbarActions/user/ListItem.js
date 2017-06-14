import React from "react"

export default class ListItem extends React.Component {

    render() {

        const { title, href, icon, onClick } = this.props

        return (
        	<a href={href} onClick={onClick}>
	            <li>
	                <i class={icon}></i>
	                <h2>{title}</h2>
	            </li>
	        </a>
        )
    }
}
