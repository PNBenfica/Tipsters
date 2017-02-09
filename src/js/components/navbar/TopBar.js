import React from "react"

import Hamburger from "./Hamburger"
import NavbarBrand from "./NavbarBrand"
import NavbarTopLinks from "./navbarTopLinks/NavbarTopLinks"

export default class TopBar extends React.Component {

    render() {

        const { onHamburgerClick } = this.props

        return (

            <div class="row">
                <div class="navbar-header col-xs-12">
                    
                    <Hamburger onClick={onHamburgerClick} />

                    <NavbarBrand />

                    <NavbarTopLinks />

                </div>
            </div>
        )
    }
}
