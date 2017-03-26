import React from "react"
import { connect } from "react-redux"

import { addComment, fetchPosts, likePost } from "../actions/postsActions"

import LoadingGif from "./LoadingGif"
import PostBuy from "../components/post/postBuy/PostBuy"
import Post from "../components/post/Post"


@connect((store) => {
    return {
        posts: store.posts.posts,
        fetched: store.posts.fetched,
        fetching: store.posts.fetching,
    }
})
export default class PostsContainer extends React.Component {

    componentWillMount() {
        this.fetchPosts(this.props)
    }

    componentWillReceiveProps(nextProps){
        const {user, postId} = this.props
        if ((nextProps.user != user) || (nextProps.postId != postId)) {
            this.fetchPosts(nextProps)
        }
    }

    fetchPosts(filters){
        const {user, postId} = filters
        filters = { user, postId }
        this.props.dispatch(fetchPosts(filters))
    }

    addComment(id, comment) {
        this.props.dispatch(addComment(id, comment))
    }

    likePost(id) {
        this.props.dispatch(likePost(id))
    }

    onScrollBottom(){
        console.log("Need to fetch more posts!")
    }

    renderPosts(){
        const { posts } = this.props

        return posts.map((post, i) => {
            if (post.price > 0)
                return <PostBuy key={i} {...post}/>
            else
                return <Post likePost={this.likePost.bind(this, post.websafeKey)} addComment={this.addComment.bind(this, post.websafeKey)} key={i} {...post}/>
        })
    }
            // <ScrollPageDetector onScrollBottom={this.onScrollBottom.bind(this)}>
            // </ScrollPageDetector>

    render() {

        const { fetched, fetching } = this.props

        let Posts = []
        if (fetching)
            Posts = <LoadingGif />
        else if (fetched)
            Posts = this.renderPosts()

        return (
            <div class="posts-container">
                {Posts}
            </div>
        )
    }
}
