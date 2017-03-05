import React from "react"

export default class Footer extends React.Component {

    render() {

        const { icon, value, onClick} = this.props

        return (
            <div class="button" onClick={() => onClick()}>
                <i class={icon} aria-hidden="true"></i> {value}
            </div>
        )
    }
}
