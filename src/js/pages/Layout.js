import React from "react";
import { Link } from "react-router";

import BottomChatContainer from "../components/bottomChat/BottomChatContainer";
import NavBar from "../components/navbar/NavBar";

export default class Layout extends React.Component {

    render() {

        const { location } = this.props;

        return (
            <div id="wrapper">

                <NavBar location={location} />

                <div id="page-wrapper">
                    {this.props.children}
                </div>
                
                <BottomChatContainer />
            </div>
        );
    }
}
