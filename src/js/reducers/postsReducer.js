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
        case "FETCH_POST_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_POST_REJECTED": {
            return {...state, fetching: false, error: action.payload.err}
        }
        case "FETCH_POST_FULFILLED": {
            const post = action.payload
            post.tips.forEach(tip => [tip.homeImg, tip.awayImg] = randomTeamImages() )
            return {
                ...state,
                fetching: false,
                fetched: true,
                posts: [action.payload]
            }
        }
        case "FETCH_POSTS_FULFILLED": {
            const { posts = [] } = action.payload
            posts.forEach(post => post.tips.forEach(tip => [tip.homeImg, tip.awayImg] = randomTeamImages() ))
            return {
                ...state,
                fetching: false,
                fetched: true,
                posts: action.payload.posts
            }
        }
        case "ADD_COMMENT_PENDING":{
            const { post_id, comment } = action.params
            const posts = [...state.posts]
            const postToUpdate = posts.findIndex(post => post.websafeKey === post_id)
            const updatedComments = [ ...posts[postToUpdate].comments, { comment, "date": "just now", "tipster": { "avatar": "img/pauloteixeira.jpg", "name": "Paulo Teixeira" }} ]
            posts[postToUpdate] = Object.assign({}, posts[postToUpdate], {comments: updatedComments})
            return {
                ...state,
                posts
            }
        }
        case "ADD_COMMENT_FULFILLED":{
            return {
                ...state,
            }
        }
        case "LIKE_POST_PENDING":{
            const { post_id } = action.params
            const posts = [...state.posts]
            const postToUpdate = posts.findIndex(post => post.websafeKey === post_id)
            let { liked, nLikes } = posts[postToUpdate]
            liked = !liked
            nLikes = liked ? ++nLikes : --nLikes
            console.log(posts[postToUpdate])
            posts[postToUpdate] = Object.assign({}, posts[postToUpdate], { liked }, { nLikes })
            return {
                ...state,
                posts
            }
        }
        case "LIKE_POST_FULFILLED":{
            
        }
    }

    return state
}

function randomTeamImages(){
    let images = ["img/sports/arouca.png", "img/sports/arsenal.png", "img/sports/barcelona.png", "img/sports/belenenses.png", "img/sports/borussia.png", "img/sports/braga.png", "img/sports/chaves.png", "img/sports/feirense.png", "img/sports/liverpool.jpg", "img/sports/maritimo.png", "img/sports/moreirense.png", "img/sports/nacional.png", "img/sports/pferreira.png", "img/sports/porto.png", "img/sports/realmadrid.png"]
    const homeImg = randomElement(images)
    images.splice(images.indexOf(homeImg),1)
    const awayImg = randomElement(images)
    return [ homeImg, awayImg ]
}

function randomElement(array){
    return array[Math.floor(Math.random()*array.length)];  
}