import React from "react";

import Tip from "./Tip";

export default class TipsterFormPopover extends React.Component {

  render() {

    const Tips = this.props.tips
        .map(({selection, event, odd}, i) => <Tip key={i} tipnumber={i+1} selection={selection} event={event} odd={odd}/>);

    return (
        <div class="popover-tipster-history">
            {Tips}
        </div>
    );
  }
}
