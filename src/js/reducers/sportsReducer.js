export default function reducer(state={
    leaguesTables: [],
    fetchingLeagues: false,
    fetchedLeagues: false,
    errorLeagues: null,

    matchesTables: [],
    fetchingMatches: false,
    fetchedMatches: false,
    errorMatches: null,

    matchTables: [],
    fetchingMatch: false,
    fetchedMatch: false,
    errorMatch: null,

  }, action) {

    switch (action.type) {


        case "FETCH_LEAGUES_PENDING": {
            return {...state, fetchingLeagues: true}
        }
        case "FETCH_MATCHES_PENDING": {
            return {...state, fetchingMatches: true}
        }
        case "FETCH_MATCH_PENDING": {
            return {...state, fetchingMatch: true}
        }


        case "FETCH_LEAGUES_REJECTED": {
            return {...state, fetchingLeagues: false, errorLeagues: action.payload.err}
        }
        case "FETCH_MATCHES_REJECTED": {
            return {...state, fetchingMatches: false, errorMatches: action.payload.err}
        }
        case "FETCH_MATCH_REJECTED": {
            return {...state, fetchingMatch: false, errorMatch: action.payload.err}
        }


        case "FETCH_LEAGUES_FULFILLED": {

            let leaguesTables = parseTables(action.payload)

            return {
                ...state,
                fetchingLeagues: false,
                fetchedLeagues: true,
                leaguesTables
            }
        }

        case "FETCH_MATCHES_FULFILLED": {

            let matchesTables = parseTables(action.payload)

            return {
                ...state,
                fetchingMatches: false,
                fetchedMatches: true,
                matchesTables
            }
        }

        case "FETCH_MATCH_FULFILLED": {

            let matchTables = parseTables(action.payload)

            return {
                ...state,
                fetchingMatch: false,
                fetchedMatch: true,
                matchTables
            }
        }

        case "ADD_POST_FULFILLED": {
            window.location.href = window.location.href.split("#")[0] + "#/posts/" + action.payload.greeting
        }
    }

    return state
}

function parseTables(tables){
    tables.events.forEach(
        event => event.matches && event.matches.forEach(
            match => match.bets.forEach(
                bet => bet.choices.forEach(
                    choice => choice.name = renderChoiceName(match.name, choice.name) ) ) ) )
    return tables
}

function renderChoiceName(match, choice){
    const [ homeTeam, awayTeam ] = match.split(' - ')
    choice = choice.replace("%1%", homeTeam)
    choice = choice.replace("%2%", awayTeam)
    return choice
}