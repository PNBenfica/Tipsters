import React from "react"

import SectionHeader from "./SectionHeader"

export default class Section extends React.Component {

    render() {

    	const { title } = this.props

        return (
            <section class="col-xs-12">

            	<SectionHeader title={title} />

            	<div class="body col-xs-12">
            		{this.props.children}
            	</div>
            	
            </section>
        )
    }
}
