import React from "react"

import BodyPanel from "./BodyPanel"
import Header from "./Header"

export default class Panel extends React.Component {

    render() {

        const { title } = this.props

        return (
            <div class="trend-bar-panel">

                <Header title={title} />

                <div class="panel-body">
                    { this.props.children.map(this.renderBodyPanel) }
                </div>

            </div>
        )
    }


    /* render each box of the panel */
    renderBodyPanel = (item, i) =>  <BodyPanel key={i} item={item} />

}
