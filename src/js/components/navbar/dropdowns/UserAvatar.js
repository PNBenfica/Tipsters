import React from "react";

export default class UserAvatar extends React.Component {

  render() {

                // <a href="#/profile"><img src={tipsterImage} class="img-circle"></img></a>
    return (

        <a class="dropdown-toggle nav-bar-avatar" data-toggle="dropdown" href="#">
            <img src="img/joaoalmeida.jpg" class="img-thumbnail img-circle"></img>
            <div class="tipster-name-avatar">
                <p>Paulo Teixeira</p>
                <p>20,00€</p>
            </div> 
            <i class="fa fa-angle-down pull-right"></i>
        </a>
    );
  }
}
