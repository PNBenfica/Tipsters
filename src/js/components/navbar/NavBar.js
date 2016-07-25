import React from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default class Nav extends React.Component {

  render() {

    return (

        <nav class="navbar navbar-default navbar-fixed-top navbar-static-top" role="navigation">
            <TopBar />
            <SideBar />
        </nav>
    );
  }
}
