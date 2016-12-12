export function fetchPosts() {
    return {
        type: "FETCH_POSTS_FULFILLED"
    }
}

export function addComment(id, comment) {
    return {
        type: "ADD_COMMENT",
        payload: {id:id, comment:comment}
    }
}