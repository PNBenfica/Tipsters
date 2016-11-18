import React from "react"

import HeaderCross from "./HeaderCross"

export default class Header extends React.Component {

    render() {

        const { title, href, close, toggle } = this.props

        return (
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a id={href + "_button"} data-toggle="collapse" onClick={() => toggle()} href={href}>
                        {title}
                    </a>
                    <HeaderCross close={close} />
                </h4>
            </div>
        )
    }
}
