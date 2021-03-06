import React from "react"

import classNames from "classnames"

export default class NavbarLinks extends React.Component {

    getOptions(pathname){
        return [ {name: "News Feed", href:"feed", active : pathname.match(/^\/feed/) },
                 {name: "Share a tip", href:"sports", active : pathname.match(/^\/sports/)},
                 {name: "Rankings", href:"rankings", active : pathname.match(/^\/rankings/) }]
    }

    render() {

        const { location, open } = this.props

        const options = this.getOptions(location.pathname)

        return (
        	<div class={classNames("navbar-links", { open })} >
	        	{
	        		options.map((option, i) => <a key={i} class={classNames("hover-underline", { active: option.active })} href={"#/"+option.href}>{option.name}</a> )
	        	}
        	</div>
        )
    }
}
