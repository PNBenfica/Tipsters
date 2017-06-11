import React from "react"

import classNames from "classnames"

export default class Button extends React.Component {

    render() {

        const { active, text, icon, onClick } = this.props

        return (
            <div type="button" class={classNames("button", { active })} onClick={() => onClick()}>
                <i class={icon}></i>
                <span> {text}</span>
            </div>
        )
    }
}
