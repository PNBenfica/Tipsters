import React from "react"

import Tip from "./Tip"

export default class Tips extends React.Component {

    render() {

    const Tips = this.props.tips
        .map(({...tip}, i) => <Tip key={i} {...tip}/>)

    return (
            <div class="col-xs-12">                
                {Tips}             
            </div>
        )
    }
}
