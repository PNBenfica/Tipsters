import React from "react"

export default class SlidePanel extends React.Component {

    render() {

        const { url, img } = this.props

        return (
            <a class="slide-panel col-xs-12" href={url}>

                <picture class="col-xs-12">

                    <img src={img} />

                </picture>

                {this.props.children}

            </a>
        )
    }

}
