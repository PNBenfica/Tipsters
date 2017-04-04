export default function reducer(state={
    tables: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
        case "FETCH_TABLES_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_TABLES_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_TABLES_FULFILLED": {

            let tables = action.payload
            tables.events.forEach(
                event => event.matches && event.matches.forEach(
                    match => match.bets.forEach(
                        bet => bet.choices.forEach(
                            choice => choice.name = renderChoiceName(match.name, choice.name) ) ) ) )

            return {
                ...state,
                fetching: false,
                fetched: true,
                tables
            }
        }
        case "ADD_POST_FULFILLED": {
            window.location.href = window.location.href.split("#")[0] + "#/posts/" + action.payload.greeting
        }
    }

    return state
}

function renderChoiceName(match, choice){
    const [ homeTeam, awayTeam ] = match.split(' - ')
    choice = choice.replace("%1%", homeTeam)
    choice = choice.replace("%2%", awayTeam)
    return choice
}