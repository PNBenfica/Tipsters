import React from "react"

export default class SearchBar extends React.Component {


    handleChange(e){
        this.props.addSearchFilter(e.target.value)
    }

    render() {

        return (
            <form>
                <input onChange={this.handleChange.bind(this)} type="search" placeholder="Search" />
            </form>
        )
    }
}
