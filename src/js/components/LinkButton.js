import React from "react"

import Button from "./Button"

export default class LinkButton extends React.Component {

    render() {

    	const { url, title } = this.props

        return (
            <a class="link-button" href={url}><Button title={title}/></a>
        )
    }
}
