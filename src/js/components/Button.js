import React from "react"

import classNames from "classnames"

export default class Button extends React.Component {

    render() {

    	const { active, onClick, title } = this.props

        return (
            <div class={classNames("button", { active })} onClick={() => onClick()}><span>{ title }</span></div>
        )
    }
}
