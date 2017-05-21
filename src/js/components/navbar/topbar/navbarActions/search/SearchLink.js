import React from "react"

import Link from "./../Link"
import SearchSidebar from "./SearchSidebar"

export default class SearchLink extends React.Component {

    render() {

        const { onClick, open } = this.props

        return (

            <div class="link" onClick={() => onClick()}>

        		<svg><use xlinkHref="img/icons.svg#search" /></svg>

                <SearchSidebar open={open} close={onClick} />

            </div>
        )
    }
}
