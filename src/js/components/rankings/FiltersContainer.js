import React from "react"

import onClickOutside from 'react-onclickoutside'

import FiltersButton from "./FiltersButton"
import SearchBar from "./SearchBar"

        
export default class FiltersContainer extends React.Component {


    constructor(args){
        super(...args)
        this.state = {
            open: ""
        }
        this.WrappedSearchBar = this.HOC(SearchBar, "search")
        this.WrappedFilters = this.HOC(FiltersButton, "filter")
    }

    onIconClick(icon){
        let open = this.state.open
        if (open === icon)
            icon = ""
        this.setState({ open: icon })
    }

    onClickOutsideIcon(icon){
        let open = this.state.open
        if (open === icon){
            this.setState({ open: "" })
        }
    }

    applyFilters(){
        this.onIconClick("filter")
        this.props.applyFilters()
    }

    render() {

        const { addFilter, applyFilters, addSearchFilter, filters } = this.props
        const { open } = this.state
        
        return (
            <div class="rankings-nav-filters">
                
                <this.WrappedSearchBar addSearchFilter={addSearchFilter} />
                
                <this.WrappedFilters filters={filters} addFilter={addFilter} applyFilters={this.applyFilters.bind(this)} />
                    
            </div>
        )
    }

    HOC(Component, name) {
        const _this = this

        return onClickOutside( class extends React.Component {

            handleClickOutside(event){
                _this.onClickOutsideIcon(name)
            }
      
            render() {    
                const { open } = _this.state
                return <Component {...this.props} open={open === name} onIconClick={_this.onIconClick.bind(_this, name)} />
            }
    })}


}

