import React from "react"
import classNames from "classnames"

export default class SideBar extends React.Component {

    render() {

        const { open } = this.props

        return (
        	<div class={classNames("sidebar-right", { open } )}>

                {this.props.children}

        	</div>
        )
    }
}
