import React from "react"

import SideBar from "./SideBar"
import TopBar from "./TopBar"

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
			<nav class="navbar navbar-default navbar-static-top" role="navigation">
				<TopBar onHamburgerClick={this.onHamburgerClick.bind(this)} />
				<SideBar location={location} open={this.state.sidebarOpen} />
			</nav>
		)
	}
}
