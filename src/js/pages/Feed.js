import React from "react";

import PageWithTrendBar from "./PageWithTrendBar"
import PostsContainer from "../components/PostsContainer";

export default class Feed extends React.Component {

	render() {
        
	    return (
			<PageWithTrendBar>

				<div class="col-lg-6 col-md-8 col-lg-push-1 feed-container">
					<PostsContainer />
				</div>

			</PageWithTrendBar>
	    );
	}
}
