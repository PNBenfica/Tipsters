import React from "react"
import ReactDOM from "react-dom"

import DropdownIcon from "./DropdownIcon"
import SearchBarDropdown from "./dropdowns/search/SearchDropdown"

export default class SearchLink extends React.Component {

	constructor(args){
		super(...args)
		this.state = {open:false}
	}

	toggleSearch(){
    	const open = ReactDOM.findDOMNode(this.refs.searchDropdown).className.includes("open")
		this.setState({ open })
	}

    render() {


        return (
            <div class="link" ref="searchDropdown" onClick={() => this.toggleSearch()}>

	            <i class="fa fa-fw fa-search"></i>

                <SearchBarDropdown focus={this.state.open} />

            </div>
        )
    }
}
