import React from "react"
import classNames from "classnames"

import BarItem from "./BarItem"

export default class SideBar extends React.Component {

    render() {

        let { options, active, submenu } = this.props

        options = options.map((option, i) => <BarItem key={i} location={location} {...option}/>)

        return (
            <div class={classNames("bar", { active, submenu })}>
                
                { options }

            </div>
        )
    }
}
