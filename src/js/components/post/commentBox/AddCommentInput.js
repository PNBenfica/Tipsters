import React from "react";
import ReactDOM from 'react-dom';

import {InputGroup, FormControl, Button} from "react-bootstrap";

export default class AddCommentInput extends React.Component {

    addComment() {
        const input = ReactDOM.findDOMNode(this.refs.commentInput);
        const comment = input.value;

        if (comment !== ""){
            this.props.addComment(comment);
        }

        input.value = "";
    }

    render() {

        return (
            <InputGroup>
                <FormControl ref="commentInput" type="text" class="input-sm" placeholder="Add a comment..."/>
                <InputGroup.Button>
                    <Button bsSize="small" onClick={this.addComment.bind(this)}>Send</Button>
                </InputGroup.Button>
            </InputGroup>
        );
    }
}
