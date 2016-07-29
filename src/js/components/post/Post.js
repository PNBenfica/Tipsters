import React from "react";
import {Glyphicon} from "react-bootstrap";

import CommentBox from "./CommentBox";
import TipsterForm from "./TipsterForm";

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
                    <div class="col-xs-12 col-sm-4 feed-post-left-container">
                        <div class="wrapper">
                            <p>Total odd: 3.41</p>
                            <p class="divider hidden-xs"></p>
                            <p>Tipster form:</p>

                            <TipsterForm />

                            <p class="divider"></p>
                            <p class="divider hidden-xs"></p>
                            <p class="hidden-xs">Profit: 120</p>
                            <p class="hidden-xs">Win-Loss: 120-60</p>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-8 feed-post-right-container">
                        <div class="panel-body post-content">
                            <div class="panel panel-default post-tips">
                                <div class="panel-body">
                                    <p class="post-tip-selection">1. Benfica</p>
                                    <a href="#/sports"><p class="post-tip-event">Belenenses vs Benfica</p></a>
                                    <p class="post-tip-odd">1.51</p>
                                </div>
                            </div>
                            <div class="panel panel-default post-tips">
                                <div class="panel-body">
                                    <p class="post-tip-selection">2. Rio Ave</p>
                                    <a href="#/sports"><p class="post-tip-event">Sporting vs Rio Ave</p></a>
                                    <p class="post-tip-odd">2.35</p>
                                </div>
                            </div>
                            <p class="tipster-comment">Benfica is very strong, they win.<br></br>Sporting is very weak, they lose for sure.</p><p></p>
                        </div>
                    </div>
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
