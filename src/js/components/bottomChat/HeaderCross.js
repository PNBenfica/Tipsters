import React from "react"

export default class HeaderCross extends React.Component {

    render() {

        const { close } = this.props

        return (
            <i class="" onClick={() => close()} class="fa fa-times pull-right" aria-hidden="true"></i>
        )
    }
}
