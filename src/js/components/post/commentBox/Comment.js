import React from "react"

    export default class Comment extends React.Component {

    render() {

        const { tipsterName, tipsterImage, date, comment} = this.props

        return (

        <div class="post-comment">

            <a class="tipster-image" href="#/profile">
                <img src={tipsterImage}></img>
            </a>

            <div class="post-comment-body">
                <a class="tipster-name" href="#/profile">{tipsterName}</a>
                <div class="comment-date"><i class="fa fa-clock-o fa-fw"></i> {date}</div>
                <p class="comment">{comment}</p>            
            </div>

        </div>
        )
    }
}
