import React from "react";

import Post from "../components/Post";
import TrendEvents from "../components/trendbar/TrendEvents";
import TrendUsers from "../components/trendbar/TrendUsers";

export default class Feed extends React.Component {
  render() {
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

	        <Post />
	        <Post />
	        <Post />

	        <div class="feed-post feed-post-to-buy panel panel-default col-md-12">
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
	                            <button type="button" class="btn btn-xs btn-default my-sucess-button" data-html="true" data-toggle="popover" data-placement="left" data-content='<div class="popover-tipster-history"><div class="panel panel-default"><div><p>1. Benfica<p><p>Belenenses vs Benfica<p><p>1.51<p></div></div><div class="panel panel-default"><div><p>2. Bayern<p><p>Wolfsburg vs Bayern<p><p>1.36<p></div></div></div>'>V</button>
	                            <button type="button" class="btn btn-xs btn-default my-sucess-button" data-html="true" data-toggle="popover" data-placement="left" data-content='<div class="popover-tipster-history"><div class="panel panel-default"><div><p>1. Benfica<p><p>Belenenses vs Benfica<p><p>1.51<p></div></div></div>'>V</button>
	                            <button type="button" class="btn btn-xs btn-default my-fail-button" data-html="true" data-toggle="popover" data-placement="left" data-content='<div class="popover-tipster-history"><div class="panel panel-default"><div><p>1. Benfica<p><p>Belenenses vs Benfica<p><p>1.51<p></div></div></div>'>D</button>
	                            <button type="button" class="btn btn-xs btn-default my-fail-button" data-html="true" data-toggle="popover" data-placement="left" data-content='<div class="popover-tipster-history"><div class="panel panel-default"><div><p>1. Benfica<p><p>Belenenses vs Benfica<p><p>1.51<p></div></div></div>'>D</button>
	                            <button type="button" class="btn btn-xs btn-default my-sucess-button" data-html="true" data-toggle="popover" data-placement="left" data-content='<div class="popover-tipster-history"><div class="panel panel-default"><div><p>1. Benfica<p><p>Belenenses vs Benfica<p><p>1.51<p></div></div></div>'>V</button>
	                        </div>
	                        <br></br>
	                        <div style={{"textAlign":"center"}} class="col-xs-12"><span><small>120 W - 60 L</small></span></div>
	                    </div>
	                </div>
	            </div>
	            <div class="panel-body post-content">
	                <div class="panel panel-default post-tips">
	                    <div class="panel-body">
	                        <p class="post-tip-selection">Numero de Seleções: 5</p>
	                        <p class="post-tip-event">Odd total: 2.23</p>
	                        <p class="post-tip-odd">Preço: 0.30€</p>
	                    </div>
	                </div>
	            </div>

	            <div class="panel-footer">
	                <div class="row">
	                    <a href="#" class="col-xs-6 col-sm-4"><span class="glyphicon glyphicon-shopping-cart"></span>Comprar tip</a>
	                    <div class="col-xs-6 col-sm-8 buttons">
	                        <a href="#" class=""><span class="glyphicon glyphicon-thumbs-up"></span><small>2</small></a>
	                        <a href="#" class=""><span class="glyphicon glyphicon-comment"></span><small>2</small></a>
	                        <a href="#" class=""><span class="glyphicon glyphicon-share"></span></a>
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