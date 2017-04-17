export default function reducer(state={
        suggestions: [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_SEARCH_SUGGESTIONS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_SEARCH_SUGGESTIONS_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_SEARCH_SUGGESTIONS_FULFILLED": {
            const { suggestions } = action.payload
            suggestions.forEach(
                suggestion => {
                    if (suggestion.type == "USER"){
                        suggestion.url = "#/profile/" + suggestion.name
                    }
                    else if(suggestion.type == "EVENT"){
                        const { sportId, sportName, leagueId, leagueName, matchId, matchName } = suggestion
                        suggestion.name = matchName
                        suggestion.url = "#/sports/"+sportName+"/"+sportId+"/"+leagueName+"/"+leagueId+"/"+matchName+"/"+matchId
                    }
                }
            )
            return {
                ...state,
                fetching: false,
                fetched: true,
                suggestions: suggestions
            }
        }
    }
    return state
}
