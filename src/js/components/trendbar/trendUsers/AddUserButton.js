import React from "react"

export default class AddUserButton extends React.Component {

	render() {

		const {tipsterName, tipsterImage, description} = this.props

		return (
			<div class="button"><i class="fa fa-user-plus fa-fw"></i></div>
		)
		
	}
}
