import React from "react";

import AddComentBox from "./AddComentBox";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import LoadingGif from "./../../LoadingGif"
import FixedPagePanel from "./../betslip/FixedPagePanel"

export default class TipsOnThisEvent extends React.Component {

    render() {

        const { fetching, fetched, tips } = this.props

        return (
            <FixedPagePanel title="Tips on this event" classes="tips-on-this-event" active={!fetching && tips.length > 0} icon="light-bulb" iconNumber={tips.length}>

                { <ChatBody tips={tips}/> }

            </FixedPagePanel>

        );
    }
}
