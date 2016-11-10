import React from "react";

export default class SearchBar extends React.Component {

    render() {

        return (
             <form role="search" class="navbar-form">
                <div class="form-group has-feedback">
                   <input type="text" placeholder="Search for tipsters or sport events..." class="form-control"/>
                   <div class="fa fa-search form-control-feedback"></div>
                </div>
                <button type="submit" class="hidden btn btn-default">Submit</button>
             </form>
        );
    }
}
