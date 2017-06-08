import React from "react"

export default class Button extends React.Component {

    render() {

        const { text, icon, onClick } = this.props

        return (
            <div type="button" class="button" onClick={() => onClick()}>
                <i class={icon} aria-hidden="true"></i>
                <span> {text}</span>
            </div>
        )
    }
}
