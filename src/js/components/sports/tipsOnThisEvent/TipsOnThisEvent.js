import React from "react";

import AddComentBox from "./AddComentBox";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import Section from "./../../Section"

export default class TipsOnThisEvent extends React.Component {

    render() {

        const { tips } = this.props

        return (
            <Section title="tips on this event" classes="tips-on-this-event" >

                <ChatBody tips={tips}/>

            </Section>
        );
    }
}
