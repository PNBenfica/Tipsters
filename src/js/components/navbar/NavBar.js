import React from "react"

import SideBar from "./sidebar/SideBar"
import TopBar from "./topbar/TopBar"

export default class Nav extends React.Component {


	constructor(args){
		super(args)
		this.state = {
			sidebarOpen: false 
		}
	}

	onHamburgerClick(){
		const sidebarOpen = !this.state.sidebarOpen
		this.setState({ sidebarOpen })
	}

	render() {

		const { location } = this.props

		return (
			<nav class="navbar" role="navigation">
				<TopBar location={location} onHamburgerClick={this.onHamburgerClick.bind(this)} sidebarOpen={this.state.sidebarOpen} />
			</nav>
		)
	}
}
