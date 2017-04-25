import React from "react"

import className from "classnames"

import Header from "./Header"
import TipWithComment from "./TipWithComment"
import TipWithSelections from "./TipWithSelections"

export default class TipsOnThisEvent extends React.Component {

  render() {

    const {date, tipster, tip, comment, invisible} = this.props

    var tipBody
    if (tip)
        tipBody = <TipWithSelections tips={[tip]}/>
    else
        tipBody = <TipWithComment comment={comment}/>

    return (

        <li class={className("col-xs-12", { invisible } )}>

            <Header tipster={tipster}/>

            <div class="chat-body col-xs-12">

                {tipBody}

            </div>

        </li>
    )
  }
}
