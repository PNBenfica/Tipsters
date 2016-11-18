import React from "react"

export default class HiddenMessagesPanel extends React.Component {

    render() {

        const { hiddenMessages } = this.props

        return (
            <div id="hidden-messages" class="chat-panel-message">
                <div class="panel-group">
                    <div class="panel panel-default">

                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#collapse1">{"+" + hiddenMessages.length + " "} <i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                            </h4>
                        </div>
                        
                        <div id="collapse1" class="panel-collapse collapse">
                            <div class="panel-body">Panel Body</div>
                            <div class="panel-footer">Panel Footer</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
