import React from "react"

import Comment from "./Comment"
import TotalOdd from "./TotalOdd"

export default class TipsData extends React.Component {

    render() {

        const { tipster, tips, comment, totalOdd } = this.props

        return (
            <div class="tip tip-data col-xs-12">

                <TotalOdd odd={totalOdd} />

                <Comment comment={comment}/>

            </div>
        )
    }
}