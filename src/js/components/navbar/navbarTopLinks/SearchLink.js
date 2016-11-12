import React from "react"

import DropdownIcon from "./DropdownIcon"
import SearchBarDropdown from "./dropdowns/search/SearchDropdown"

export default class SearchLink extends React.Component {

    render() {

        return (
            <li class="dropdown hidden-xs">

                <DropdownIcon icon="fa-search"/>

                <SearchBarDropdown />

            </li>
        )
    }
}
