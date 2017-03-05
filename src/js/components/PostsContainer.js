import React from "react"
import { connect } from "react-redux"

import { fetchPosts, addComment } from "../actions/postsActions"

import LoadingGif from "./LoadingGif"
import PostBuy from "../components/post/postBuy/PostBuy"
import Post from "../components/post/Post"


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
        setTimeout(() => { 
            const {user, postId} = filters
            filters = { user, postId }
            this.props.dispatch(fetchPosts(filters))
        }, 2500)
    }

    addComment(id, comment) {
        this.props.dispatch(addComment(id, comment))
    }

    onScrollBottom(){
        console.log("Need to fetch more posts!")
    }

    renderPosts(){
        let { posts } = this.props

        posts = posts.concat(posts).concat(posts).concat(posts).concat(posts)

        return posts.map((post, i) => {
            if (post.price > 0)
                return <PostBuy key={i} {...post}/>
            else
                return <Post addComment={this.addComment.bind(this, post.id)} key={i} {...post}/>
        })
    }
            // <ScrollPageDetector onScrollBottom={this.onScrollBottom.bind(this)}>
            // </ScrollPageDetector>

    render() {

        let Posts = this.renderPosts()
        if (Posts.length === 0)
            Posts = <LoadingGif />

        return (
            <div class="posts-container">
                {Posts}
            </div>
        )
    }
}
