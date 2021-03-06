import React from "react"

import NewsFeedSection from "../components/home/newsfeed/NewsFeedSection"
import LiveStreamsSection from "../components/home/livestreams/LiveStreamsSection"
import SectionsContainer from "../components/home/SectionsContainer"
import ShareATipSection from "../components/home/shareatip/ShareATipSection"
import TrendingTipstersSection from "../components/home/tipsters/TrendingTipstersSection"

export default class Feed extends React.Component {

	render() {
					// <TrendingTipstersSection />

	    return (
			<section id="home" class="col-xs-12">

				<SectionsContainer>
					
					<ShareATipSection />

					<LiveStreamsSection />


					<NewsFeedSection />

				</SectionsContainer>

			</section>
	    )
	}
}
