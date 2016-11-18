import React from "react"
import ReactDOM from 'react-dom';

import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";


export default class ChatInput extends React.Component {

  	handleKeyPress(e) {
    	if (e.key === 'Enter'){
			this.props.sendMessage(e.target.value)
      		e.preventDefault();
    	}
    }

	handleChange(e){
		this.props.onInputChange(e.target.value)
	}

    render() {

    	const { height, value } = this.props

        return (
			<FormGroup controlId="formControlsTextarea">
				<FormControl style={{"height":height+"px"}} value={value} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} componentClass="textarea" placeholder="Write a message..."/>
			</FormGroup>
        );
    }
}