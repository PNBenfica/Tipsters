import React from "react";

export default class EmptyChatPanel extends React.Component {

  render() {

    return (
        <div class="chat-body clearfix">
            <div class="panel post-tips">
                <p>No tips yet</p>
                <p>Share a tip on this event or add a comment concerning this event</p>
            </div>
        </div>
    );
  }
}
