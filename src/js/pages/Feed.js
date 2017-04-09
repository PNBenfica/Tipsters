import React from "react"


import PostsContainer from "../components/PostsContainer"
import StatusUpdate from "../components/feed/statusUpdate/StatusUpdate"
import TrendBar from "../components/trendbar/TrendBar"

export default class Feed extends React.Component {

	render() {
					// <StatusUpdate />

	    return (
			<div id="feed-page">

				<div class="col-md-8 feed-page-left">


					<PostsContainer {...this.props.params}/>
				
				</div>

				<div class="col-md-4 hidden-xs hidden-sm trend-bar-container">
					<TrendBar />
				</div>

			</div>
	    )
	}
}
