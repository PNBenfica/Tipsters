import React from "react";

import AddComentBox from "./AddComentBox";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import Section from "./../../Section"
import LoadingGif from "./../../LoadingGif"

export default class TipsOnThisEvent extends React.Component {

    renderLoadingGif(){
        return ( <div class="col-xs-12"><LoadingGif /></div>)
    }

    renderBody(){
        const { fetching, fetched, tips } = this.props

        if (fetching) {
            return this.renderLoadingGif()
        }
        else if (fetched){
            return <ChatBody tips={tips}/>
        }
    }

    render() {


        return (
            <Section title="tips on this event" classes="tips-on-this-event" >

                { this.renderBody() }

            </Section>
        );
    }
}
