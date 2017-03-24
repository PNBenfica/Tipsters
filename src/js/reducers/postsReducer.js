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
        case "ADD_COMMENT_PENDING":{
            console.log(action)
            const { post_id, comment } = action.params
            const posts = [...state.posts]
            console.log(posts)
            console.log(post_id)
            const postToUpdate = posts.findIndex(post => post.websafeKey === post_id)
            const updatedComments = [ ...posts[postToUpdate].comments, { comment, "date": "just now", "tipster": { "avatar": "img/pauloteixeira.jpg", "name": "Paulo Teixeira" }} ]
            posts[postToUpdate] = Object.assign({}, posts[postToUpdate], {comments: updatedComments})
            return {
                ...state,
                posts
            }
        }
        case "ADD_COMMENT_FULFILLED":{
            console.log("ADD_COMMENT_FULFILLED")
        }
    }

    return state
}
