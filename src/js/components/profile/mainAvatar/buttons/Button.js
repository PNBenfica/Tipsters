import React from "react"

export default class Button extends React.Component {

    render() {

        const { text, icon, onClick } = this.props

        return (
            <button type="button" class="btn" onClick={() => onClick()}>
                <i class={icon} aria-hidden="true"></i>
                <span class="hidden-xs"> {text}</span>
            </button>
        )
    }
}
