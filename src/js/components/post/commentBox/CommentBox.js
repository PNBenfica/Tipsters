import React from "react";
import {Collapse, Panel} from "react-bootstrap";

import Comment from "./Comment";
import AddCommentInput from "./AddCommentInput";

export default class CommentBox extends React.Component {

  render() {

    const Comments = [
        {
            tipsterName : "João Almeida",
            tipsterImage : "img/joaoalmeida.jpg",
            date : "2 min",
            comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        },
        {
            tipsterName : "João Almeida",
            tipsterImage : "img/joaoalmeida.jpg",
            date : "2 min",
            comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        }
    ].map(({tipsterName, tipsterImage, date, comment}, i) => <Comment tipsterName={tipsterName} tipsterImage={tipsterImage} date={date} comment={comment} key={i} /> );

    return (

        <Collapse in={this.props.in}>

            <Panel class="post-comment-box">                
                {Comments}
                <AddCommentInput />
            </Panel>
            
        </Collapse>
    );
  }
}
