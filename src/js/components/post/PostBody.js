import React from "react"

import TipsContainer from "./TipsContainer"
import Comment from "./Comment"

export default class PostBody extends React.Component {

    render() {

        const { tips, comment } = this.props

        return (
            <div>

                <TipsContainer tips={tips} />

                <Comment comment={comment}/>

            </div>   
        )
    }
}
