import React from "react";

import MessagesDropdown from "./MessagesDropdown";
import NotificationsDropdown from "./NotificationsDropdown";
import SettingsDropdown from "./SettingsDropdown";

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



                {/* Search */}
                <div class="col-sm-5 col-md-7 col-md-offset-0 hidden-xs nav-search-bar">
                    <form class="navbar-form" role="search">
                        <div class="input-group col">
                            <div class="input-group-btn">
                                <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                            </div>
                            <input type="text" class="form-control" placeholder="Search for tipsters or sport events..." name="q"></input>
                        </div>
                    </form>
                </div> {/* Search */}



                <ul class="nav navbar-top-links col-xs-5 col-xs-push-2 col-sm-push-0 col-sm-3 col-md-2">

                    <MessagesDropdown />

                    <NotificationsDropdown />

                    <SettingsDropdown />

                </ul>
                {/*<!-- /.navbar-top-links -->*/}


            </div>
        </div>
    );
  }
}
