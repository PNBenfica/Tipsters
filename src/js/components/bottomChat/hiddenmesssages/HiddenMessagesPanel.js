import React from "react"

import List from "./List"
import Header from "./Header"

export default class HiddenMessagesPanel extends React.Component {

    render() {

        const { hiddenMessages, openHiddenMessage } = this.props

        return (
            <div id="hidden-messages" class="chat-panel-message">
                <div class="panel-group">
                    <div class="panel panel-default">

                        <div id="hidden-messages-collapse" class="panel-collapse collapse">
                            <List hiddenMessages={hiddenMessages} openHiddenMessage={openHiddenMessage} />
                        </div>

                        <Header nHiddenMessages={hiddenMessages.length} />
                    </div>
                </div>
            </div>
        )
    }
}
