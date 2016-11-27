import React from "react";

export default class NewMessageLi extends React.Component {

    componentDidMount(){
    this.props.createNewMessage()
        
    }

  render() {

    return (
        <li class="dropdown-fixed-element" onClick={this.props.createNewMessage}>
            <a class="text-center">
                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                <strong> New Message</strong>
            </a>
        </li>
    );
  }
}
