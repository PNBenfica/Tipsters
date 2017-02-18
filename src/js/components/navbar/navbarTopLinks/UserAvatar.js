import React from "react";

export default class UserAvatar extends React.Component {

  render() {

                // <a href="#/profile"><img src={tipsterImage} class="img-circle"></img></a>
    return (

        <a class="dropdown-toggle nav-bar-avatar" data-toggle="dropdown" href="#">
            <img src="img/joaoalmeida.jpg" class="img-thumbnail img-circle"></img>
        </a>
    );
  }
}
