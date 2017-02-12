import React from "react"
import {Media} from "react-bootstrap"

export default class TipsterImage extends React.Component {

    render() {

        const { src } = this.props

        return (        
            <a href="#/profile" class="tipster-image-wrapper">
                <img src={src} />
            </a>
        )
    }
}
