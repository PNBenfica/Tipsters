import React from "react"
import classNames from "classnames"

import CommentBox from "./commentBox/CommentBox"
import Footer from "./footer/Footer"
import Header from "./header/Header"

export default class GenericPost extends React.Component {

    constructor(args){
        super(args)
        this.state = { noMarginTop : false }
    }


    handleScroll(){
        var viewportOffset = this.refs.post.getBoundingClientRect();
        var top = viewportOffset.top;
        const noMarginTop = window.innerHeight - top > 199
        this.setState( { noMarginTop } )
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll.bind(this))
    }

    render() {

        const { addComment, comment, commentBoxOpen, comments, date, id, likes, nComments, tips, tipster, toggleCommentBox, totalOdd } = this.props
        const { noMarginTop } = this.state

        return (

            <div class={classNames("feed-post", { noMarginTop } )} ref="post">

                <div class="vertical-stripe"/>

                <div class="inner-item">

                    <div class="feed-post-left-wrapper">

                        <img src={tipster.image} class="img-thumbnail img-circle" />

                    </div>

                    <div class="feed-post-right-wrapper">

                        <Header id={id} tipster={tipster} date={date} />

                        {this.props.children}

                        <Footer likes={likes} comments={nComments} toggleCommentBox={toggleCommentBox} />

                        <CommentBox in={commentBoxOpen} comments={comments} addComment={addComment}/>

                    </div>

                </div>


            </div>
        )
    }
}