import React from "react"

export default class SearchBar extends React.Component {


    handleChange(e){
        this.props.addSearchFilter(e.target.value)
    }

    render() {

        return (
            <div id="search-bar" class="row">
                <div class="col-xs-12">
                    <form id="demo-2">
                        <input onChange={this.handleChange.bind(this)} type="search" placeholder="Search" />
                    </form>
                </div>
            </div>
        )
    }
}
