import React from "react"

import SearchBar from "./SearchBar"
import SideBar from "./../SideBar"
import SidebarHeader from "./../SidebarHeader"

export default class SearchDropdown extends React.Component {

    render() {

        const { open, close } = this.props

        return (
            <SideBar open={open} close={close}>

                <SidebarHeader title={"Search"} icon={"fa-search"}/>

                <SearchBar open={open}/>

            </SideBar>
        )
    }
}
