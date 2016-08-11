import React from "react";

import {ButtonToolbar} from "react-bootstrap";

export default class MainAvatar extends React.Component {

    render() {

        return (
            <div class="main-avatar">
                <img id="topimage" src="img/profile-cover.jpg" />

                <div id="profile-image-wrapper">
                    <div><a href="#"><img src="img/joaoalmeida.jpg"></img></a></div>
                </div>

                <a id="profile-name" href="#/profile">João Almeida</a>

                <div class="container">
                    <ButtonToolbar>
                        <button type="button" class="btn btn-info hidden-xs"><i class="fa fa-user-plus" aria-hidden="true"></i> Follow</button>
                        <button type="button" class="btn btn-info hidden-xs"><i class="fa fa-envelope" aria-hidden="true"></i> Message</button>
                        <button type="button" class="btn btn-info visible-xs"><i class="fa fa-user-plus" aria-hidden="true"></i></button>
                        <button type="button" class="btn btn-info visible-xs"><i class="fa fa-envelope" aria-hidden="true"></i></button>
                    </ButtonToolbar>
                </div>

            </div>
        );
    }
}
