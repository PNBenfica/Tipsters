import React from "react"

export default class Footer extends React.Component {

    render() {

        const { title, icon, value, onClick} = this.props

        return (
            <div class="footer-button" onClick={() => onClick()}>
                <i class={icon} aria-hidden="true"></i> {title} ({value})
            </div>
        )
    }
}
