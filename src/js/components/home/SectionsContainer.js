import React from "react"

export default class SectionsContainer extends React.Component {

    render() {

    	const { sections } = this.props

        return (
            <div class="sections-container col-xs-12">

            	{ this.props.children }
            	
            </div>
        )
    }
}
