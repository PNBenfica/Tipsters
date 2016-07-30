import React from "react";

import CommentBox from "./commentBox/CommentBox";
import FooterXs from "./FooterXs";
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


        const Post = {
                        tips : [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35}],
                        comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60},
                        date : "7:30 PM",
                        likes : "5",
                        comments : "2",
                        totalOdd : 3.41
                    };
        
        return (
            <div class="feed-post panel panel-default col-md-12">
                
                <Header tipsterName={Post.tipster.name} tipsterImage={Post.tipster.image} date={Post.date} likes={Post.likes} comments={Post.comments} toggleCommentBox={this.toggleCommentBox.bind(this)} />

                <PostBody tips={Post.tips} comment={Post.comment} tipster={Post.tipster} totalOdd={Post.totalOdd}/>

                <FooterXs likes={Post.likes} comments={Post.comments} toggleCommentBox={this.toggleCommentBox.bind(this)} />
     
                <CommentBox in={this.state.commentBoxOpen}/>

            </div>
    );
  }
}