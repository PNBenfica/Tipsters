import React from "react"

export default class SearchSuggestion extends React.Component {

    render() {

    	const { name, url } = this.props

        return ( <a href={url}><li>{ name }</li></a> )
    }
}
