import React from "react"

export default class BarItemLogo extends React.Component {

    render() {

        const { logo } = this.props

        return (
            <div class="img-wrapper">
                <img src={ logo }/>
                <div class="hover"> </div>
            </div>
        )
    }
}
