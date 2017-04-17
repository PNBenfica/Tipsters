import React from "react"
import { connect } from "react-redux"

import { fetchSuggestions } from "../../../../../actions/searchActions";

import SearchBar from "./SearchBar"
import SideBar from "./../SideBar"
import SidebarHeader from "./../SidebarHeader"
import SearchSuggestions from "./SearchSuggestions"

@connect((store) => {
  return {
    suggestions: store.search.suggestions,
  }
})
export default class SearchDropdown extends React.Component {

	constructor(args){
		super(args)
		this.state = {search : ""}
	}

    componentWillMount() {
        this.props.dispatch(fetchSuggestions())
    }

    onInputChange(search){
    	this.setState({ search })
    }

    getSuggestions(){
    	let { suggestions } = this.props
    	const { search } = this.state

    	if (search === "")
    		suggestions = []
    	else
    		suggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().includes(search.toLowerCase())).sort()
    	return suggestions
    }

    render() {

        const { open, close } = this.props
        const suggestions = this.getSuggestions()

        return (
            <SideBar open={open} close={close}>

                <SidebarHeader title={"Search"} icon={"fa-search"}/>

                <SearchBar open={open} onInputChange={this.onInputChange.bind(this)} />

                <SearchSuggestions suggestions={ suggestions } />

            </SideBar>
        )
    }
}
