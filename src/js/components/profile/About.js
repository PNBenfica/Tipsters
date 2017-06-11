import React from "react";

import Section from "../Section"

export default class About extends React.Component {

    render() {
    	const { text } = this.props

        return (
            <div class="col-xs-12">
                <Section title="About" id="profile-about-section">
                    {text}
                </Section>
            </div>
        );
    }
}
