import React from "react"

export default class Header extends React.Component {

    render() {

        const { nHiddenMessages } = this.props

        return (
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" href="#hidden-messages-collapse">{"+" + nHiddenMessages + " "} <i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                </h4>
            </div>
        )
    }
}
