import React from "react"

import classNames from "classnames"

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


    componentWillReceiveProps(nextProps){
        const currentpath = this.props.location.pathname
        if (currentpath != nextProps.location.pathname){
			this.setState({ sidebarOpen : false })
        }
    }

	render() {

		const { location, inverted } = this.props

		return (
			<nav class={classNames( "navbar", { inverted })} role="navigation" >
				<TopBar location={location} onHamburgerClick={this.onHamburgerClick.bind(this)} sidebarOpen={this.state.sidebarOpen} />
			</nav>
		)
	}
}
