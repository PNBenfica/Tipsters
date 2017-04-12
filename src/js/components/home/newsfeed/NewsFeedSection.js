import React from "react"

import Section from "../Section"
import Posts from "./Posts"

export default class NewsFeedSection extends React.Component {

    render() {

        return (
            <Section title="News feed" id="news-feed">

                <Posts />
            	
            </Section>
        )
    }
}
