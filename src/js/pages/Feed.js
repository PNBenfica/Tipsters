import React from "react"
import { connect } from "react-redux"

import Page from "./Page"
import PostsContainer from "../components/PostsContainer"
import StatusUpdate from "../components/feed/statusUpdate/StatusUpdate"
import TrendBar from "../components/trendbar/TrendBar"

@connect((store) => {
    return {
        fetched: store.posts.fetched,
        fetching: store.posts.fetching,
    }
})
export default class Feed extends React.Component {

	render() {

		const loading = this.props.fetching || !this.props.fetched

	    return (
			<Page id="feed-page" title="News Feed" loading={loading} img="img/covers/feed.jpg" >

				<div class="col-md-8 feed-page-left">

					<PostsContainer {...this.props.params}/>
				
				</div>

				<div class="col-md-4 hidden-xs hidden-sm trend-bar-container">
					<TrendBar />
				</div>

			</Page>
	    )
	}
}
