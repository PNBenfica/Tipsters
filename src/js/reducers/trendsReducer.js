export default function reducer(state={
        users: [],
        events: [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_TRENDS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_TRENDS_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_TRENDS_FULFILLED": {

            const trends = {
                users:[
                    {tipsterName:"Paulo Teixeira", tipsterImage:"img/pauloteixeira.jpg", description:"Is on a 5 green tips streak!"},
                    {tipsterName:"João Almeida", tipsterImage:"img/joaoalmeida.jpg", description:"Is on a 27 loosing streak!"},
                    {tipsterName:"Paulo Teixeira", tipsterImage:"img/pauloteixeira.jpg", description:"Is on a 5 green tips streak!"}],
                events:[
                    {homeTeam: {name: "Arsenal", logo: "img/sports/arsenal.png"}, awayTeam: {name: "Liverpool", logo: "img/sports/liverpool.jpg"}, description:"20 tips shared in the last hour", eventUrl:"#/sports/football/1/premier-league/3/arsenal-united/1267076"}, 
                    {homeTeam: {name: "Real Madrid", logo: "img/sports/realmadrid.png"}, awayTeam: {name: "Barcelona", logo: "img/sports/barcelona.png"}, description:"9 tips shared in the last hour", eventUrl:"#/sports/football/1/premier-league/3/arsenal-united/1267076"}]
            }
            // const trends = action.payload
            const { users, events } = trends
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: users,
                events: events,
            }
        }
    }

    return state
}
