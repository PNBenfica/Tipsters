import React from "react"

import ListItem from "./ListItem"

export default class List extends React.Component {

    render() {

        const hiddenMessages = this.props.hiddenMessages.map((message, i) => <ListItem key={i} message={message} openHiddenMessage={this.props.openHiddenMessage}/>).reverse()

        return (
            <ul class="list-group">
                {hiddenMessages}
            </ul>
        )
    }
}
