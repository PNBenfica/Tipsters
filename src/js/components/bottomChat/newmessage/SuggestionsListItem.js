import React from "react"

export default class SuggestionsListItem extends React.Component {

    render() {

        const { createNewMessage, name } = this.props

        return (
            <li class="list-group-item" onClick={() => createNewMessage(name)}>{name.substring(0,18)}</li>
        )
    }
}
