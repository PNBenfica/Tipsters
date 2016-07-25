import React from "react";
import { Link } from "react-router";

import NavBar from "../components/navbar/NavBar";

export default class Layout extends React.Component {
    render() {

        return (
            <div id="wrapper">

                <NavBar />

                <div id="page-wrapper">
                    {this.props.children}
                </div>
                
            </div>
        );
    }
}
