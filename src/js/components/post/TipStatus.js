import React from "react"
import classNames from "classnames";

export default class TipStatus extends React.Component {

    render() {

        let { status } = this.props

        status = status.toLowerCase()

        if (status === "pendent")
            return null
        else{
            return (
                <div class={classNames("tip-status", status)}>
                    {status}
                </div>
            )
        }

    }
}
