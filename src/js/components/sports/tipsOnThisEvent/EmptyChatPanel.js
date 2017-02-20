import React from "react"

export default class EmptyChatPanel extends React.Component {

    render() {

    return ( 
        <div class="panel-body empty-chat">

            <div class="panel panel-default post-tips">
                <div class="panel-body">
                    <p><strong>No tips shared </strong>yet. Share a tip in this event or comment in the box bellow!</p>
                </div>
            </div>
        </div>
        )
    }
}
