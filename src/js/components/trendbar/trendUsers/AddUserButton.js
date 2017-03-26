import React from "react"
import classNames from "classnames"

export default class AddUserButton extends React.Component {

	render() {

		const {followUser, following, tipsterName, tipsterImage, description} = this.props

		const buttonClasses = classNames("button", { active: following })
		const iconClasses = classNames("fa fa-fw", { "fa-user-plus": !following }, { "fa-user-times": following })

		return (
			<div onClick={()=>followUser()} class={buttonClasses}><i class={iconClasses}></i></div>
		)
		
	}
}
