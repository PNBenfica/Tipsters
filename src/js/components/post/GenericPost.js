import React from "react"

import CommentBox from "./commentBox/CommentBox"
import Footer from "./footer/Footer"
import GenericPostBody from "./GenericPostBody"
import Header from "./header/Header"

export default class GenericPost extends React.Component {

    render() {

        const { addComment, comment, commentBoxOpen, comments, date, id, likes, nComments, tips, tipster, toggleCommentBox, totalOdd } = this.props

        return (

            <div class="feed-post panel">

                <Header id={id} tipster={tipster} date={date} />

                <GenericPostBody PostBody={this.props.children} tipster={tipster} totalOdd={totalOdd} />

                <Footer likes={likes} comments={nComments} toggleCommentBox={toggleCommentBox} />

                <CommentBox in={commentBoxOpen} comments={comments} addComment={addComment}/>

            </div>
        )
    }
}