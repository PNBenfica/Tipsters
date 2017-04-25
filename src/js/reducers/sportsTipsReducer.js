export default function reducer(state={
    tips: [],
    fetching: false,
    fetched: false,
  }, action) {

    switch (action.type) {
        case "FETCH_EVENT_TIPS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_EVENT_TIPS_REJECTED": {
            return {...state, fetching: false}
        }
        case "FETCH_EVENT_TIPS_FULFILLED": {
            let { tips } = action.payload
            tips.forEach( tip => tip.tip.choiceName = renderChoiceName(tip.tip.matchName, tip.tip.choiceName) )
            return {...state, fetching: false, fetched: true, tips}
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