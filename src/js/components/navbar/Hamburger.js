import React from "react"

export default class Hamburger extends React.Component {

  render() {

        return (
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-nav">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        )
    }
}
