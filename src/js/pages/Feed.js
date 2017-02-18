import React from "react"

import PageWithTrendBar from "./PageWithTrendBar"
import PostsContainer from "../components/PostsContainer"

export default class Feed extends React.Component {

	render() {

	    return (
			<PageWithTrendBar>

				<div id="feed-page">
					<div class="row">
						<div class="col-md-8">
							<PostsContainer {...this.props.params}/>
						</div>
					</div>
				</div>

			</PageWithTrendBar>
	    )
	}
}
