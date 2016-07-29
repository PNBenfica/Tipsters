import React from "react";
import {Glyphicon} from "react-bootstrap";

import CommentBox from "./CommentBox";
import PostInfoContainer from "./PostInfoContainer";
import PostTipsContainer from "./PostTipsContainer";

export default class Post extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {commentBoxOpen: false};
    }

    render() {

        return (
        <div class="feed-post panel panel-default col-md-12">

            <div class="panel-heading col-xs-12 media">
                <div class="feed-post-tipster-image media-left">
                    <a href="#"><img src="img/joaoalmeida.jpg" class="img-circle"></img></a>
                </div>
                <div class="panel-title media-body">
                    <div>
                        <a href="#/profile">João Almeida</a>
                        <p class="small-text"><i class="fa fa-clock-o fa-fw"></i> 7:30 PM</p>
                    </div>
                </div>
                <div class="btn-group hidden-xs" role="group">
                    <a><Glyphicon glyph="thumbs-up"/><small>5</small></a>
                    <a onClick={ ()=> this.setState({ commentBoxOpen: !this.state.commentBoxOpen })}><Glyphicon glyph="comment"/><small>2</small></a>
                </div>
            </div> {/* panel-heading */}


            <div class="container-fluid">
                <div class= "row">

                    <PostInfoContainer totalodd="3.41" profit="120" wins="120" losses="60" />

                    <PostTipsContainer />
                                        
                </div>
            </div>

            <div class="panel-footer visible-xs">
                <div class="row">
                    <a class="col-xs-6"><Glyphicon glyph="thumbs-up" /><small>5</small></a>
                    <a class="col-xs-6" onClick={ ()=> this.setState({ commentBoxOpen: !this.state.commentBoxOpen })}><Glyphicon glyph="comment" /><small>2</small></a>
                </div>
            </div>

 
            <CommentBox in={this.state.commentBoxOpen}/>

        </div>
    );
  }
}
