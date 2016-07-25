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
            <h3 class="panel-title media-body">
                <p>João Almeida</p>
                <p class="small-text"><i class="fa fa-clock-o fa-fw"></i> 2 min</p>
            </h3>
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
                    <div style={{"textAlign":"center"}} class="col-xs-12"><span><small>120 W - 60 L</small></span></div>
                </div>
            </div>
        </div>
        <div class="panel-body post-content">
            <div class="panel panel-default post-tips">
                <div class="panel-body">
                    <p class="post-tip-selection">1. Benfica</p>
                    <p class="post-tip-event">Belenenses vs Benfica</p>
                    <p class="post-tip-odd">1.51</p>
                </div>
            </div>
            <div class="panel panel-default post-tips">
                <div class="panel-body">
                    <p class="post-tip-selection">2. Rio Ave</p>
                    <p class="post-tip-event">Sporting vs Rio Ave</p>
                    <p class="post-tip-odd">2.35</p>
                </div>
            </div>
            <p class="tipster-comment">Benfica is very strong, they win.<br></br>Sporting is very weak, they lose for sure.</p><p></p>
        </div>

        <div class="panel-footer">
            <div class="row">
                <a href="#" class="col-xs-4"><span class="glyphicon glyphicon-thumbs-up"></span><small>5</small></a>
                <a class="col-xs-4" role="button" data-toggle="collapse" href="#commentBox" aria-expanded="false" aria-controls="commentBox"><span class="glyphicon glyphicon-comment"></span><small>2</small></a>
                <a href="#" class="col-xs-4"><span class="glyphicon glyphicon-share"></span></a>
            </div>
        </div>


        <div class="collapse post-comment-box panel panel-default row" id="commentBox">
            
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
