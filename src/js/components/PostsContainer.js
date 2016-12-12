import React from "react";
import { connect } from "react-redux";

import { fetchPosts, addComment } from "../actions/postsActions";

import PostBuyTip from "../components/post/PostBuyTip";
import Post from "../components/post/Post";


@connect((store) => {
    return {
        posts: store.posts.posts
        // fetched: store.notifications.fetched,
        // fetching: store.notifications.fetching,
    };
})
export default class PostsContainer extends React.Component {

    componentWillMount() {
        this.fetchPosts()
    }

    fetchPosts(){
        this.props.dispatch(fetchPosts())
    }

    addComment(id, comment) {
        this.props.dispatch(addComment(id, comment))
    }

    render() {

        const Posts = this.props.posts.map((post, i) => {
            if (post.price > 0)
                return <PostBuyTip key={i} {...post}/>
            else
                return <Post addComment={this.addComment.bind(this, post.id)} key={i} {...post}/>
        });

        return (
            <div>
                {Posts}
            </div>
        );
    }
}
