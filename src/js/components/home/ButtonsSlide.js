import React from "react"

import LinkButton from "./../LinkButton"

export default class ButtonSlide extends React.Component {

    render() {

    	let { buttons } = this.props
    	buttons = buttons.map((button,i) => <LinkButton {...button} /> )

        return (
            <div class="buttons-slide col-xs-12">
                <div class="inner-item">
                    <LinkButton title="Start Live Stream" url="#" />
                </div>
            </div>
        )
    }

}