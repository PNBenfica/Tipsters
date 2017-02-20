import React from "react";
import classNames from "classnames";

import EmptyChatPanel from "./EmptyChatPanel";
import TipOnThisEvent from "./TipOnThisEvent";

export default class ChatBody extends React.Component {

  render() {

  	const {tips} = this.props;

  	var Tips;
    if (tips.length > 0)
        Tips = tips.map(({...tip}, i) => <TipOnThisEvent key={i} {...tip} />);
    else
        return <EmptyChatPanel />;

    return (
        <div class="panel-body" style={{'height': '' + Math.min(320, 130 + tips.length * 50) + 'px', 'overflowY': (130 + tips.length * 50 > 320)? 'scroll':'hidden'}}>
            <ul class="chat" id="tips-on-this-events">                    
                {Tips}
            </ul>
        </div>
    );
  }
}
