import React from "react"
import classNames from "classnames"


export default class Footer extends React.Component {

    render() {

        const { active, icon, value, onClick} = this.props

        return (
            <div class={classNames("button", { active } )} onClick={() => onClick()}>
                <i class={icon} aria-hidden="true"></i> <span>{value}</span>
            </div>
        )
    }
}
