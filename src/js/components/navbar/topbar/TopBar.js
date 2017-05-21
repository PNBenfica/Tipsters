import React from "react"

import Hamburger from "./Hamburger"
import NavbarBrand from "./NavbarBrand"
import NavbarLinks from "./NavbarLinks"
import NavbarActions from "./navbarActions/NavbarActions"

export default class TopBar extends React.Component {

    render() {

        const { location, onHamburgerClick, sidebarOpen } = this.props

        return (

            <div class="row">
                <div class="navbar-header col-xs-12">

                    <NavbarBrand />

                    <NavbarLinks location={location} open={sidebarOpen} />

                    <NavbarActions />
                    
                    <Hamburger onClick={onHamburgerClick} />

                </div>
            </div>
        )
    }
}
