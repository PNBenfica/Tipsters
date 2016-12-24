import React from "react"
import classNames from "classnames"

export default class TimeSelectorOption extends React.Component {

    render() {

    	const { active, title, onClick } = this.props
        return (
			<li class={classNames({active: active})}><a onClick={() => onClick(title)}>{title}</a></li>
        )
    }
}
