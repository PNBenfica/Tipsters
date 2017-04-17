import React from "react"
import ReactDOM from "react-dom"

export default class SearchBar extends React.Component {

	componentDidUpdate(prevProps, prevState){
		if (this.props.open)
  			ReactDOM.findDOMNode(this.refs.searchInput).focus() 
	}

    handleChange(e){
        this.props.onInputChange(e.target.value)
    }

    preventClose(e){
        e.stopPropagation()
    }

    render() {
        return (
            <form role="search" class="navbar-form" onClick={(e) => this.preventClose(e)}>
                <div class="form-group has-feedback">
                    <input onChange={this.handleChange.bind(this)} type="text" ref="searchInput" placeholder="Search for tipsters or sport events..." class="form-control"/>
                    <div class="fa fa-search form-control-feedback"></div>
                </div>
                <button type="submit" class="hidden btn btn-default">Submit</button>
            </form>
        )
    }
}
