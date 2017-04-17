import React from "react"

import SearchSuggestion from "./SearchSuggestion"

export default class SearchSuggestions extends React.Component {

    render() {

        const suggestions = this.props.suggestions.map((suggestion,i) => <SearchSuggestion key={i} {...suggestion} />)

        return (
            <ul>
                { suggestions }
            </ul>
        )
    }
}
