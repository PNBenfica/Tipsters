
export function fetchPosts(filters) {
    return {
        type: "FETCH_POSTS_FULFILLED",
        payload: filters
    }
}

export function addComment(id, comment) {
    return {
        type: "ADD_COMMENT",
        payload: {id:id, comment:comment}
    }
}