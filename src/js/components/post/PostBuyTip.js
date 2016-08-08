import React from "react";

import CommentBox from "./commentBox/CommentBox";
import Footer from "./Footer";
import Header from "./Header";
import PostBuyBody from "./PostBuyBody";

export default class PostBuyTip extends React.Component {

    constructor(...args) {
        super(...args);
    }

    toggleCommentBox() {
        alert("Must buy the tip!!");
    }

    render() {

        const { tipster, date, likes, nComments, totalOdd, selections, price} = this.props;
        
        return (
            <div class="feed-post panel panel-default col-md-12 feed-post-to-buy">
                
                <Header tipsterName={tipster.name} tipsterImage={tipster.image} date={date} likes={likes} comments={nComments} toggleCommentBox={this.toggleCommentBox.bind(this)} />

                <PostBuyBody tipster={tipster} totalOdd={totalOdd} selections={selections} price={price}/>

                <Footer likes={likes} comments={nComments} toggleCommentBox={this.toggleCommentBox.bind(this)} />
    
            </div>
    );
  }
}