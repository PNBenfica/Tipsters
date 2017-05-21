import React from "react"

import BottomChatContainer from "../components/bottomChat/BottomChatContainer"
import NavBar from "../components/navbar/NavBar"
import VerticalSlider from "../components/verticalSlider/VerticalSlider"

export default class Layout extends React.Component {

    render() {

        const { location } = this.props

        // return (
        //     <div id="wrapper">

                  //              <div id="page-wrapper">
                       //             {this.props.children}
                     //           </div>
        //     </div>
        // )
        return (
            <div id="wrapper">

                <NavBar location={location} />

                <VerticalSlider />

                
                <BottomChatContainer />

            </div>
        )
    }
}
