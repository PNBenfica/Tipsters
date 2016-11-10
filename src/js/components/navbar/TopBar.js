import React from "react";

import MessagesDropdown from "./dropdowns/MessagesDropdown";
import NotificationsDropdown from "./dropdowns/NotificationsDropdown";
import SearchDropdown from "./dropdowns/SearchDropdown";
import UserDropdown from "./dropdowns/UserDropdown";

export default class TopBar extends React.Component {

  render() {

    return (

        <div class="row">

            <div class="navbar-header col-xs-12">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-nav">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <a class="navbar-brand col-xs-3 col-sm-2" href="#">Tipsters</a>

                <ul class="nav navbar-top-links navbar-right">

                    <SearchDropdown />

                    <MessagesDropdown />

                    <NotificationsDropdown />

                    <UserDropdown />

                </ul>

            </div>
        </div>
    );
  }
}
