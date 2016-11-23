import React from "react"

import Cross from "./Cross"
import Title from "./Title"

export default class Header extends React.Component {

    render() {

        const { title, href, close, toggle } = this.props

        return (
            <div class="panel-heading">
                <h4 class="panel-title">

                    <Title title={title} href={href} toggle={toggle} />

                    <Cross close={close} />
                
                </h4>
            </div>
        )
    }
}
