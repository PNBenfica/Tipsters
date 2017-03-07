import React from "react"

export default class Button extends React.Component {

    render() {

    	const { onClick, title } = this.props

        return (
            <div class="button" onClick={() => onClick()}><span>{ title }</span></div>
        )
    }
}
