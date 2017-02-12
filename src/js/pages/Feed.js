import React from "react"

import PageWithTrendBar from "./PageWithTrendBar"
import PostsContainer from "../components/PostsContainer"

export default class Feed extends React.Component {

	render() {

	    return (
			<PageWithTrendBar>

				<div id="feed-page" class="col-md-8 col-lg-7">
					<PostsContainer {...this.props.params}/>
				</div>

			</PageWithTrendBar>
	    )
	}
}
