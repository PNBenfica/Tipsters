import React from "react"

import GenericPost from "./../GenericPost"
import PostBuyBody from "./PostBuyBody"

export default class PostBuy extends React.Component {

    toggleCommentBox() {
        alert("Must buy the tip!!")
    }

    render() {

        const { tipster, totalOdd, selections, price} = this.props

        return null

        return (
            <div>

                <GenericPost {...this.props} toggleCommentBox={this.toggleCommentBox.bind(this)} commentBoxOpen={false}>

                    <PostBuyBody tipster={tipster} totalOdd={totalOdd} selections={selections} price={price}/>

                </GenericPost>

            </div>
        )
    }
}