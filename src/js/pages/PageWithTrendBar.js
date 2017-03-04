import React from "react";

import TrendBar from "../components/trendbar/TrendBar";

export default class PageWithTrendBar extends React.Component {

	render() {
        
	    return (
			<div>

				{this.props.children}

				<div class="col-md-4 col-lg-push-2 hidden-xs hidden-sm hidden trend-bar-container">
					<TrendBar />
				</div>

			</div>
	    );
	}
}
