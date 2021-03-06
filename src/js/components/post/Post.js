import React from "react"

import GenericPost from "./GenericPost"
import Tips from "./Tips"
import TipsData from "./TipsData"
import Video from "./Video"

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

        const { tipster, tips, comment, totalOdd, video } = this.props

        return (
            <GenericPost {...this.props} toggleCommentBox={this.toggleCommentBox.bind(this)} commentBoxOpen={this.state.commentBoxOpen}>

                <Tips tips={tips} />

                <TipsData comment={comment} totalOdd={totalOdd} />

                { video ? <Video video={video} /> : null }

            </GenericPost>
    )
  }
}