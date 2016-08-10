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
            <div class="row">
                <div class="btn-group col-xs-12" role="group">
                    <ButtonToolbar>
                        {LastTips}
                    </ButtonToolbar>
                </div>
                <br></br>
            </div>
        </div>
    );
  }
}