import React from "react"

import GenericPost from "./GenericPost"
import PostBody from "./PostBody"

export default class Post extends React.Component {

    constructor(...args) {
        super(...args)
        this.state = {commentBoxOpen: false}
    }

    toggleCommentBox() {
        const commentBoxOpen = !this.state.commentBoxOpen
        this.setState({commentBoxOpen})
    }

    render() {

        const { tipster, tips, comment, totalOdd } = this.props

        return (
            <GenericPost {...this.props} toggleCommentBox={this.toggleCommentBox.bind(this)} commentBoxOpen={this.state.commentBoxOpen}>

                <PostBody tips={tips} comment={comment} />

            </GenericPost>
    )
  }
}