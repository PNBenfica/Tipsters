import React from "react"

import BodyPanel from "./BodyPanel"
import LoadingGif from "./LoadingGif"
import Header from "./Header"

export default class Panel extends React.Component {

    render() {

        const { fetching, title } = this.props

        const body = fetching ? <LoadingGif /> : this.props.children.map(this.renderBodyPanel)

        return (
            <div class="trend-bar-panel">

                <Header title={title} />

                <div class="panel-body">
                    {body}
                </div>

            </div>
        )
    }


    /* render each box of the panel */
    renderBodyPanel = (item, i) =>  <BodyPanel key={i} item={item} />

}
