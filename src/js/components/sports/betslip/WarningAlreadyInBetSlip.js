import React from "react"
import Warning from "../../Warning"

export default class WarningAlreadyInBetSlip extends React.Component {

    render() {

        return (
            <Warning {...this.props} >
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <span>You already have a selection in this event.</span>
            </Warning>
        )
    }
}
