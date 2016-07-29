import React from "react";

import Tip from "./Tip";

export default class PostTipsContainer extends React.Component {

  render() {

    const Tips = [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51},
                   { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35}
                ].map(({selection, event, odd}, i) => <Tip key={i} tipnumber={i+1} selection={selection} event={event} odd={odd}/>);;

    return (
        <div class="col-xs-12 col-sm-8 feed-post-right-container">
            <div class="panel-body post-content">
                
                {Tips}

                <p class="tipster-comment">Benfica is very strong, they win.<br></br>Sporting is very weak, they lose for sure.</p><p></p>
            </div>
        </div>
    );
  }
}
