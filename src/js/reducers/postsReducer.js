export default function reducer(state={
        posts: [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_POSTS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_POSTS_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_POSTS_FULFILLED": {

            return {
                ...state,
                fetching: false,
                fetched: true,
                posts: [{
                        id : 123456,
                        tips : [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35}],
                        comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60,
                                        lastTips : [ { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost", tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost",  tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}]},
                        date : "7:30 PM",
                        likes : "5",
                        nComments : "2",
                        totalOdd : 3.41,
                        comments : [ { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}]
                        },{
                        id : 123457,
                        tips : [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35}],
                        comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60,
                                        lastTips : [ { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost", tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost",  tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}]},
                        date : "7:30 PM",
                        likes : "5",
                        nComments : "2",
                        totalOdd : 3.41,
                        comments : [ { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}]
                        },{
                        id : 123458,
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60,
                                        lastTips : [ { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost", tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost",  tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}]},
                        date : "7:30 PM",
                        selections : 5,
                        totalOdd : 3.41, 
                        likes : "5",
                        nComments : "2",
                        price : 0.30                     
                        }]
            }
        }
        case "ADD_COMMENT":{
            const { id, comment } = action.payload
            const posts = [...state.posts]
            const postToUpdate = posts.findIndex(post => post.id === id)
            const updatedComments = [ ...posts[postToUpdate].comments, { tipsterName : "Paulo Teixeira", tipsterImage : "img/pauloteixeira.jpg", date : "just now", comment : comment}]
            posts[postToUpdate] = Object.assign({}, posts[postToUpdate], {comments: updatedComments})
            return {
                ...state,
                posts
            }
        } 
    }

    return state
}
