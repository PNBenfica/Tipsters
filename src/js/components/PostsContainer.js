import React from "react"
import { connect } from "react-redux"

import { addComment, fetchPost, fetchPosts, fetchUserPosts, likePost } from "../actions/postsActions"
import {  } from "../actions/userActions"

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
        const {username, postId} = this.props
        if ((nextProps.username != username) || (nextProps.postId != postId)) {
            this.fetchPosts(nextProps)
        }
    }

    fetchPosts(filters){
        const {username, postId} = filters
        if (typeof postId !== 'undefined')
            this.props.dispatch(fetchPost(postId))
        else if(typeof username !== 'undefined')
            this.props.dispatch(fetchUserPosts(username))
        else
            this.props.dispatch(fetchPosts())
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

    render() {

        const { fetched, fetching } = this.props

        const loading = fetching || !fetched 

        const Posts = loading ? null : this.renderPosts()
        
        return (
            <div class="posts-container">
                {Posts}
            </div>
        )
    }
}
