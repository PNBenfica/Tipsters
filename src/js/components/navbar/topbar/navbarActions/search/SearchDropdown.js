import React from "react";

import SearchBar from "./SearchBar";

export default class SearchDropdown extends React.Component {

    render() {

        return (
            <div id="search-dropdown" class="dropdown-menu">
                <SearchBar focus={this.props.focus} />
            </div>
        );
    }
}
