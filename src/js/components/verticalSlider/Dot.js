import React from "react"

import classNames from "classnames"

export default class Dot extends React.Component {

    render() {

        const { active, hoverText, onClick } = this.props

        return (
            <div class={classNames("dot", { active } ) } onClick={onClick}>
            	<span />
            	<div class="hover">{ hoverText }</div>
            </div>
        )
    }
}
