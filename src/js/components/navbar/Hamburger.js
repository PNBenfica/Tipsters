import React from "react"

export default class Hamburger extends React.Component {

  render() {

        const { onClick } = this.props

        return (
            <button type="button" class="navbar-toggle" onClick={() => onClick()}>
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        )
    }
}
