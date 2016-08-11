import React from "react";

import {Popover, OverlayTrigger, Button, ButtonToolbar} from "react-bootstrap";

import PostsContainer from "../components/PostsContainer";
import TrendBar from "../components/trendbar/TrendBar";

export default class Feed extends React.Component {

	render() {
        
	    return (
			<div class="row">

				<div class="col-lg-6 col-md-8 col-lg-push-1">
					<PostsContainer />
				</div>

				<div class="col-md-4 col-lg-push-2 hidden-xs hidden-sm trend-bar-container">
					<TrendBar />
				</div>

			</div>
	    );
	}
}
