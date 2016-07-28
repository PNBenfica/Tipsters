import React from "react";
import {Popover, OverlayTrigger, Button, ButtonToolbar} from "react-bootstrap";

export default class Post extends React.Component {

  render() {

    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus">
        <div class="popover-tipster-history">
            <div class="panel panel-default">
                <div>
                    <p>1. Benfica</p>
                    <p>Belenenses vs Benfica</p>
                    <p>1.51</p>
                </div>
            </div>
            <div class="panel panel-default">
                <div>
                    <p>2. Bayern</p>
                    <p>Wolfsburg vs Bayern</p>
                    <p>1.36</p>
                </div>
            </div>
        </div>
      </Popover>
    );

    return (
    <div class="feed-post panel panel-default col-md-12">
    
        <div class="panel-heading col-xs-12 media">
            <div class="feed-post-tipster-image media-left">
                <a href="#"><img src="img/joaoalmeida.jpg" class="img-circle"></img></a>
            </div>
            <div class="panel-title media-body">
                <div>
                    <a href="#/profile">John Breakgrow jr.</a>
                    <p class="small-text"><i class="fa fa-clock-o fa-fw"></i> 7:30 PM</p>
                </div>
            </div>
            <div class="btn-group hidden-xs" role="group">
                <a href="#"><span class="glyphicon glyphicon-thumbs-up"></span><small>5</small></a>
                <a role="button" data-toggle="collapse" href="#commentBox" aria-expanded="false" aria-controls="commentBox"><span class="glyphicon glyphicon-comment"></span><small>2</small></a>
            </div>
        </div> {/* panel-heading */}


        <div class="container-fluid">
            <div class= "row">
                <div class="col-xs-12 col-sm-4 feed-post-left-container">
                    <div class="wrapper">
                        <p>Total odd: 3.41</p>
                        <p class="divider hidden-xs"></p>
                        <p>Tipster form:</p>

                        <div class="feed-post-tipster-history">
                            <div class="row">
                                <div class="btn-group col-xs-12" role="group" aria-label="Basic example">
                                    <ButtonToolbar>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverHoverFocus}>
                                            <button type="button" class="btn btn-xs btn-default my-sucess-button">V</button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverHoverFocus}>
                                            <button type="button" class="btn btn-xs btn-default my-sucess-button">V</button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverHoverFocus}>
                                            <button type="button" class="btn btn-xs btn-default my-fail-button">D</button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverHoverFocus}>
                                            <button type="button" class="btn btn-xs btn-default my-fail-button">D</button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverHoverFocus}>
                                            <button type="button" class="btn btn-xs btn-default my-sucess-button">V</button>
                                        </OverlayTrigger>
                                    </ButtonToolbar>
                                </div>
                                <br></br>
                            </div>
                        </div>

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
                <a href="#" class="col-xs-4"><span class="glyphicon glyphicon-thumbs-up"></span><small>5</small></a>
                <a class="col-xs-4" role="button" data-toggle="collapse" href="#commentBox" aria-expanded="false" aria-controls="commentBox"><span class="glyphicon glyphicon-comment"></span><small>2</small></a>
                <a href="#" class="col-xs-4"><span class="glyphicon glyphicon-share"></span></a>
            </div>
        </div>


        <div class="collapse post-comment-box panel panel-default" id="commentBox">
            
            <div class="panel-body media">
                <div class="media-left">
                    <a href="#"><img src="img/joaoalmeida.jpg"></img></a>
                </div>
                <div class="media-body">
                    <a href="#">João Almeida <small><i class="fa fa-clock-o fa-fw"></i> 2 min</small></a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>            
                </div>
            </div>


            <div class="panel-body media">
                <div class="media-left">
                    <a href="#"><img src="img/joaoalmeida.jpg"></img></a>
                </div>
                <div class="media-body">
                    <a href="#">João Almeida <small><i class="fa fa-clock-o fa-fw"></i> 2 min</small></a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>            
                </div>
            </div>


            <div class="panel-body">
                <div class="input-group">
                    <input id="btn-input" type="text" class="form-control input-sm" placeholder="Add a comment..." />
                    <span class="input-group-btn">
                        <button class="btn btn-warning btn-sm">
                            Send
                        </button>
                    </span>
                </div>
            </div>
        </div>

    </div>
    );
  }
}
