import React from "react"

export default class SectionHeader extends React.Component {

    render() {

    	const { title } = this.props

        return (
            <header class="col-xs-12">
                <h1>{title}</h1>
            </header>
        )
    }
}
