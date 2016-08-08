import React from "react";

import CommentBox from "./commentBox/CommentBox";
import Footer from "./Footer";
import Header from "./Header";
import PostBody from "./PostBody";

export default class Post extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {commentBoxOpen: false};
    }

    toggleCommentBox() {
        const commentBoxOpen = !this.state.commentBoxOpen;
        this.setState({commentBoxOpen});
    }

    render() {

        const { tipster, tips, comment, date, likes, nComments, totalOdd, comments, addComment} = this.props;
        
        return (
            <div class="feed-post panel panel-default col-md-12">
                
                <Header tipsterName={tipster.name} tipsterImage={tipster.image} date={date} likes={likes} comments={nComments} toggleCommentBox={this.toggleCommentBox.bind(this)} />

                <PostBody tips={tips} comment={comment} tipster={tipster} totalOdd={totalOdd}/>

                <Footer likes={likes} comments={nComments} toggleCommentBox={this.toggleCommentBox.bind(this)} />
    
                <CommentBox in={this.state.commentBoxOpen} comments={comments} addComment={addComment}/>

            </div>
    );
  }
}