import React from "react"
import classNames from "classnames"

import BarItemLogo from "./BarItemLogo"
import BarItemName from "./BarItemName"
import Bar from "./Bar"


export default class BarItem extends React.Component {

    render() {

        const { name, logo, href, active } = this.props

        return (
            <a href={"#/" + href} class={classNames("item col-xs-12", { active } )} >

                <BarItemLogo logo={logo} />

                <BarItemName name={name}/>

            </a>
        )
    }
}
