import React from "react";

import Tip from "./Tip";

export default class TipWithSelections extends React.Component {

  render() {

    const Tips = this.props.tips
                .map(({...tip}, i) => <Tip key={i} {...tip}/>);

    return (
        <div class="tips-container">
            {Tips}
        </div>
    );
  }
}
