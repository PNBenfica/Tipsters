import React from "react"

import SectionHeader from "./SectionHeader"

export default class Section extends React.Component {

    render() {

    	const { id, title } = this.props

        return (
            <section id={id} class="col-xs-12">

            	<SectionHeader title={title} />

            	<div class="body col-xs-12">
            		{this.props.children}
            	</div>
            	
            </section>
        )
    }
}
