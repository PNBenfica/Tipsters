import React from "react"
import { Collapse } from "react-bootstrap"

import AddCommentInput from "./AddCommentInput"
import Comment from "./Comment"

var lodash = require('lodash')

export default class CommentBox extends React.Component {

    constructor(...args) {
        super(...args)
        this.state = {numVisibleComments: 5}
    }

    showMoreComments(){
        const numVisibleComments = this.state.numVisibleComments + 2
        this.setState({numVisibleComments})
    }

    render() {

        const { comments = [] } = this.props 

        // get the last 'numVisibleComments'. the other are hidden
        let visibleComments = comments.slice(Math.max(comments.length-this.state.numVisibleComments, 0), comments.length)
        visibleComments = visibleComments.map((comment, i) => <Comment {...comment} key={i} /> )


        return (

            <Collapse in={this.props.in}>

                <div class="post-comment-box">
                    <a class={visibleComments.length < comments.length ? 'visible' : 'hidden'} onClick={this.showMoreComments.bind(this)}>Mostrar mais comentarios</a>
                    {visibleComments}
                    <AddCommentInput addComment={this.props.addComment} />
                </div>
                
            </Collapse>
        )
    }
}