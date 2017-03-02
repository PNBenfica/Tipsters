import React from "react"

import FiltersButton from "./FiltersButton"
import SearchBar from "./SearchBar"

        
export default class FiltersContainer extends React.Component {


    constructor(args){
        super(...args)
        this.state = {
            open: ""
        }
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

    render() {

        const { addFilter, addSearchFilter, filters } = this.props
        const { open } = this.state
        
        return (
            <div class="col-xs-12 rankings-nav-filters">
                
                <WrappedSearchBar addSearchFilter={addSearchFilter} open={open === "search"} onIconClick={this.onIconClick.bind(this, "search")} onClickOutsideIcon={this.onClickOutsideIcon.bind(this, "search")} />
                
                <FiltersButton filters={filters} addFilter={addFilter} open={open === "filter"} onIconClick={this.onIconClick.bind(this, "filter")}/>
                    
            </div>
        )
    }
}

const HOC = (Component, n) => class extends React.Component {
  
  render() {    
    console.log('Rendering ' + n);
    return <Component {...this.props} />
  }
};


const WrappedSearchBar = HOC(SearchBar, 1)
