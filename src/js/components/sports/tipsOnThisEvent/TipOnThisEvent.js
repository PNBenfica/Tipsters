import React from "react";

import Date from "./Date";
import TipsterImage from "./TipsterImage";
import TipsterName from "./TipsterName";
import TipWithComment from "./TipWithComment";
import TipWithSelections from "./TipWithSelections";

export default class TipsOnThisEvent extends React.Component {

  render() {

    const {date, tipster, tips, comment} = this.props;

    var tipBody;
    if (tips)
        tipBody = <TipWithSelections tips={tips}/>;
    else
        tipBody = <TipWithComment comment={comment}/>;

    return (

        <li class="left clearfix">

            <TipsterImage image={tipster.image} />

            <div class="chat-body clearfix">

                <div class="header">
                    <TipsterName name={tipster.name}/>
                    <Date date={date} />                    
                </div>
                
                {tipBody}
            </div>
        </li>
    );
  }
}
