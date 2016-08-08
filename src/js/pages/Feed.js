import React from "react";

import {Popover, OverlayTrigger, Button, ButtonToolbar} from "react-bootstrap";

import Post from "../components/post/Post";
import TrendEvents from "../components/trendbar/TrendEvents";
import TrendUsers from "../components/trendbar/TrendUsers";

export default class Feed extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {posts: [{
                        tips : [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35}],
                        comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60},
                        date : "7:30 PM",
                        likes : "5",
                        nComments : "2",
                        totalOdd : 3.41,
                        comments : [ { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                        			 { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}]
                    	},{
                        tips : [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35}],
                        comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60},
                        date : "7:30 PM",
                        likes : "5",
                        nComments : "2",
                        totalOdd : 3.41,
                        comments : [ { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}]
                    	}]};
    }

    addComment(post, comment) {
    	post.comments = [ ...post.comments, { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : comment}];
    	this.setState({posts: this.state.posts});
    }

	render() {
        

		const Posts = this.state.posts.map((post, i) => <Post addComment={this.addComment.bind(this, post)} key={i} tips={post.tips} comment={post.comment} tipster={post.tipster} date={post.date} likes={post.likes} nComments={post.nComments} totalOdd={post.totalOdd} comments={post.comments}/>);

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
	      <div class="row">
		    <div class="col-lg-6 col-md-8 col-lg-push-1 feed-container">

		        {/*<!-- Got any tips? new post -->*/}
		        {/*<!-- <div class="panel panel-default col-md-12" id="feed-new-post">
		            
		            <div class="panel-body media">
		                <div class="new-post-tipster-image media-left">
		                    <a href="#"><img src="img/pauloteixeira.jpg"></a>
		                </div>
		                <div class="media-body">
		                    <textarea id="feed-textarea" class="col-xs-12" rows="1" placeholder="Got any tips?"></textarea>
		                </div>
		            </div>
		            <div id="new-post-button-wrapper" class="panel-body collapse">
		                <button type="button" class="btn btn-default pull-right">Publicar</button>
		            </div>

		        </div> -->*/}

		        {Posts}

			    <div class="feed-post panel panel-default col-md-12 feed-post-to-buy">
		    
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
			        </div> {/* panel-heading */}


			        <div class="container-fluid">
			            <div class= "row">
			                <div class="col-xs-12 col-sm-4 feed-post-left-container">
			                    <div class="wrapper">
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
			                                <p>Seleções: 5</p>
			                                <p>Odd total: 2.23</p>
			                                <p>Preço: 0.30€</p>
			                            </div>
			                        </div>
			                        <button class="btn btn-block"><span class="glyphicon glyphicon-shopping-cart"></span> Comprar tip</button>
			                    </div>
			                </div>
			            </div>
			        </div>

			        <div class="panel-footer visible-xs">
			            <div class="row">
		                    <a href="#" class="col-xs-6"><span class="glyphicon glyphicon-shopping-cart"></span>Comprar tip</a>
		                    <a href="#" class="col-xs-3"><span class="glyphicon glyphicon-thumbs-up"></span><small>2</small></a>
		                    <a href="#" class="col-xs-3"><span class="glyphicon glyphicon-comment"></span><small>2</small></a>
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
			</div>



		    {/*<!-- Trend bar -->*/}
		    <div class="col-md-4 col-lg-push-2 hidden-xs hidden-sm trend-bar-container">
		        <TrendEvents />
		        <TrendUsers />
		    </div>
		</div>
	    );
	}
}
