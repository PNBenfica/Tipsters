import React from "react";
import {Popover, ButtonToolbar} from "react-bootstrap";

import PopoverButton from "./PopoverButton";
import TipsterFormPopover from "./TipsterFormPopover";

var lodash = require('lodash');


export default class TipsterForm extends React.Component {

  render() {

    const LastTips = this.props.lastTips.map(({status, tips}, i) => {
                const popoverId = lodash.uniqueId('popover_');
                const popover = (
                    <Popover id={popoverId}>
                        <TipsterFormPopover tips={tips} />
                    </Popover>
                );
                return ( <PopoverButton key={i} status={status} popover={popover}/> );
            });

    return (
        <div class="feed-post-tipster-history">
            <div class="btn-group" role="group">
                <ButtonToolbar>
                    {LastTips}
                </ButtonToolbar>
            </div>
        </div>
    );
  }
}
