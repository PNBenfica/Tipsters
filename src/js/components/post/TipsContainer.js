import React from "react";

import Tip from "./Tip";
import TipsterComment from "./TipsterComment";

export default class TipsContainer extends React.Component {

  render() {

    const Tips = this.props.tips
                .map(({...tip}, i) => <Tip key={i} tipnumber={i+1} {...tip}/>);

    return (
        <div class="col-xs-12 col-sm-8 feed-post-right-container">
            <div class="panel-body post-content">                
                {Tips}
                <TipsterComment comment={this.props.comment}/>                
            </div>
        </div>
    );
  }
}
