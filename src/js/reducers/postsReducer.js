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
                posts: action.payload.posts
            }
        }
        case "ADD_COMMENT":{
            const { id, comment } = action.payload
            const posts = [...state.posts]
            const postToUpdate = posts.findIndex(post => post.websafeKey === id)
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
