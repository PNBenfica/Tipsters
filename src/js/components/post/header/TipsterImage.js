import React from "react"
import {Media} from "react-bootstrap"

export default class TipsterImage extends React.Component {

    render() {

        const { src } = this.props

        return (        
            <Media.Left>
                <a href="#/profile">
                    <img src={src} class="img-circle" />
                </a>
            </Media.Left>
        )
    }
}
