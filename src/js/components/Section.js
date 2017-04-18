import React from "react"

import classNames from "classnames"

import SectionHeader from "./SectionHeader"

export default class Section extends React.Component {

    render() {

    	const { id, title, classes } = this.props

        return (
            <section id={id} class={classNames(classes, "col-xs-12", "generic")} >

            	<SectionHeader title={title} />

            	<div class="body col-xs-12">
            		{this.props.children}
            	</div>
            	
            </section>
        )
    }
}
