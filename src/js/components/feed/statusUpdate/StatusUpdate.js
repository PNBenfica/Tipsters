import React from "react"

import Body from "./Body"
import Footer from "./Footer"

export default class StatusUpdate extends React.Component {

    render() {

        return (
            <div class="status-update panel col-xs-12">
            
                <Body />
                
                <Footer />
            
            </div>
        )
    }
}
