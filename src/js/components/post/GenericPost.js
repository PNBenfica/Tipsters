import React from "react"
import classNames from "classnames"

import CommentBox from "./commentBox/CommentBox"
import Footer from "./footer/Footer"
import Header from "./header/Header"

export default class GenericPost extends React.Component {

    constructor(args){
        super(args)
        this.state = { noMarginTop : false }
        this.handleScroll = this.handleScroll.bind(this);
    }


    handleScroll(){
        var viewportOffset = this.refs.post.getBoundingClientRect();
        var top = viewportOffset.top;
        const noMarginTop = window.innerHeight - top > 0
        if (noMarginTop != this.state.noMarginTop){
            if (noMarginTop){
                this.scrollToTop(this.refs.post)
            }
            this.setState( { noMarginTop } )
        }
    }

    scrollToTop(post) {
    // var scrollStep = (post.getBoundingClientRect().top - 73) / (scrollDuration / 15),
    var scrollStep = (post.getBoundingClientRect().top - 73) / (500 / 15),
        scrollInterval = setInterval(function(){
        if ( post.getBoundingClientRect().top > 73 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },15);
}

    componentDidMount() {
        // window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        // window.removeEventListener("scroll", this.handleScroll)
    }

    render() {

        const { addComment, comment, commentBoxOpen, comments, date, websafeKey, liked, nLikes, likePost, nComments, tips, tipster, toggleCommentBox, totalOdd } = this.props
        const { noMarginTop } = this.state

        return (

            <div class={classNames("feed-post", { noMarginTop } )} ref="post">

                <div class="vertical-stripe"/>

                <div class="inner-item">

                    <div class="feed-post-left-wrapper">

                        <img src={tipster.avatar} class="img-thumbnail" />

                    </div>

                    <div class="feed-post-right-wrapper">

                        <Header id={websafeKey} tipster={tipster} date={date} />

                        <div class="col-xs-12 wrapper">

                            {this.props.children}

                            <Footer liked={liked} likes={nLikes} likePost={likePost} comments={nComments} toggleCommentBox={toggleCommentBox} />

                            <CommentBox in={commentBoxOpen} comments={comments} addComment={addComment}/>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}