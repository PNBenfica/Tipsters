import React from "react";

import {InputGroup, FormControl, Button} from "react-bootstrap";

export default class AddCommentInput extends React.Component {

  render() {

    return (
        <InputGroup>
            <FormControl type="text" class="input-sm" placeholder="Add a comment..."/>
            <InputGroup.Button>
                <Button bsSize="small">Send</Button>
            </InputGroup.Button>
        </InputGroup>
    );
  }
}
