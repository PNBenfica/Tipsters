import React from "react"

export default class SidebarHeader extends React.Component {

    render() {

        const { createNewMessage } = this.props

        return (
            <header>
                <i class="fa fa-fw fa-envelope-o"></i>
                <h2>Messages</h2>
                <a class="fa fa-plus new-message" onClick={createNewMessage}></a>
            </header>
        )
    }
}
