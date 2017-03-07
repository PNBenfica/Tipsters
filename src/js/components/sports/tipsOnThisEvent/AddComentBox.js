import React from "react";
import ReactDOM from 'react-dom';

import Button from './../../Button';

export default class AddComentBox extends React.Component {

    addComment(){
        const input = ReactDOM.findDOMNode(this.refs.chatSportsComment);
        const comment = input.value;

        if (comment !== ""){
            this.props.addComment(comment);
        }

        input.value = "";
    }


    render() {
        return (
            <div class="panel-footer">
                <div class="input-group">
                    <input ref="chatSportsComment" id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />
                    <span class="input-group-btn">
                        <Button title="Send" onClick={this.addComment.bind(this)} />
                    </span>
                </div>
            </div>
        );
    }
}
