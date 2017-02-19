import React from "react"
import classNames from "classnames"


export default class Tip extends React.Component {

    render() {

    const { tipnumber , eventURL, bet, choice, animating, expanded} = this.props
    return (
        <div class={classNames("panel post-tips", {animating}, {expanded})}>
            <div class="panel-body">
                <p>{tipnumber}. {bet.name }: {choice.name} <a onClick={() => this.props.removeTip(eventURL, bet, choice)} class="cross pull-right">x</a></p>
                <p><a href={eventURL.renderPath()}>{eventURL.getMatchName()}</a></p>
                <p>{choice.odd}</p>
            </div>
        </div>
        )
    }
}
