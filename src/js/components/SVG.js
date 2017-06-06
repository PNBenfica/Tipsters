import React from "react"

export default class SVG extends React.Component {

    render() {

    	const { classes, icon } = this.props

        return (
            <svg class={classes}><use xlinkHref={"img/icons.svg#" + icon } /></svg>
        )
    }
}
