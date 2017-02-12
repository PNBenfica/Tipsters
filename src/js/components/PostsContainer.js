import React from "react"
import { connect } from "react-redux"

import { fetchPosts, addComment } from "../actions/postsActions"

import PostBuy from "../components/post/postBuy/PostBuy"
import Post from "../components/post/Post"
import ScrollPageDetector from "./ScrollPageDetector"


@connect((store) => {
    return {
        posts: store.posts.posts
        // fetched: store.notifications.fetched,
        // fetching: store.notifications.fetching,
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

    onScrollBottom(){
        console.log("Need to fetch more posts!")
    }

    renderPosts(){
        let { posts } = this.props

        return posts.map((post, i) => {
            if (post.price > 0)
                return <PostBuy key={i} {...post}/>
            else
                return <Post addComment={this.addComment.bind(this, post.id)} key={i} {...post}/>
        })
    }

    render() {

        const Posts = this.renderPosts()

        return (
            <ScrollPageDetector onScrollBottom={this.onScrollBottom.bind(this)}>
                <div class="posts-container">
                    {Posts}
                </div>
            </ScrollPageDetector>
        )
    }
}
