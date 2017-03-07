import React from "react"
import classNames from "classnames"

export default class TimeSelectorOption extends React.Component {

    render() {

    	const { active, title, onClick } = this.props
        return (
			<li onClick={() => onClick(title)} class={classNames({active: active})}>{title}</li>
        )
    }
}
