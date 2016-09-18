import React from "react";

export default class SearchBar extends React.Component {

  render() {

    return (
        <div class="col-sm-5 col-md-6 col-lg-7 col-md-offset-0 hidden-xs nav-search-bar">
            <form class="navbar-form" role="search">
                <div class="input-group col">
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                    </div>
                    <input type="text" class="form-control" placeholder="Search for tipsters or sport events..." name="q"></input>
                </div>
            </form>
        </div>
    );
  }
}
