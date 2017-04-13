import React from "react"

import Link from "./../Link"
import SearchSidebar from "./SearchSidebar"

export default class SearchLink extends React.Component {

    render() {

        const { onClick, open } = this.props

        return (

            <div class="link" onClick={() => onClick()}>

	            <i class="fa fa-fw fa-search"></i>

                <SearchSidebar open={open} close={onClick} />

            </div>
        )
    }
}
