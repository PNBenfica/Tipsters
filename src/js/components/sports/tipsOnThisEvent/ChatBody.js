import React from "react"
import classNames from "classnames"

import EmptyChatPanel from "./EmptyChatPanel"
import TipOnThisEvent from "./TipOnThisEvent"

export default class ChatBody extends React.Component {

    constructor(...args) {
        super(...args)
        this.state = { visibleTips : 5 }
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState( { visibleTips : 5 } )
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll(){
        let { tips } = this.props

        if (tips && tips.length > 0){
            let viewportOffset = this.refs.panel.getBoundingClientRect()
            let bottom = viewportOffset.bottom
            if (window.innerHeight > bottom)
                this.setState( { visibleTips : this.state.visibleTips + 10 } )
        }
    }

    render() {

        let { tips } = this.props

        if (tips && tips.length > 0)
            tips = tips.map(({...tip}, i) => <TipOnThisEvent key={i} {...tip} invisible={ i > this.state.visibleTips } />)
        else
            return <EmptyChatPanel />

        return (
            <div class="panel-body" ref="panel">
                <ul class="chat" id="tips-on-this-events">                    
                    {tips}
                </ul>
            </div>
        )
    }
}
