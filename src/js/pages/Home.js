import React from "react"

import NewsFeedSection from "../components/home/newsfeed/NewsFeedSection"
import SectionsContainer from "../components/home/SectionsContainer"
import ShareATipSection from "../components/home/shareatip/ShareATipSection"

export default class Feed extends React.Component {

	render() {

	    return (
			<section id="home" class="col-xs-12">

				<SectionsContainer>

					<ShareATipSection />

					<NewsFeedSection />

				</SectionsContainer>

			</section>
	    )
	}
}
