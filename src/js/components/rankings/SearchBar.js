import React from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"


export default class SearchBar extends React.Component {

    componentDidUpdate(prevProps, prevState){
        if (this.props.open)
            ReactDOM.findDOMNode(this.refs.searchInput).focus() 
    }

    handleChange(e){
        this.props.addSearchFilter(e.target.value)
    }

    render() {

        const { open, onIconClick } = this.props

        return (
            <form class="search-bar">
                <input class={classNames({open})} ref="searchInput" onChange={this.handleChange.bind(this)} type="search" placeholder="Search" />
                <div class="button" onClick={() => onIconClick()}><i class="fa fa-search"/></div>
            </form>
        )
    }
}
