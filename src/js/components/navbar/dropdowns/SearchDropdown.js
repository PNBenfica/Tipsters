import React from "react";

import DropdownIcon from "./DropdownIcon";
import SearchBar from "./SearchBar";

export default class SearchDropdown extends React.Component {

  render() {

    return (
        <li class="dropdown hidden-xs">
            <DropdownIcon icon="fa-search"/>

            <div id="search-dropdown" class="dropdown-menu">
                <SearchBar />
            </div>
        </li>
    );
  }
}
