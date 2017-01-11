import React from "react"

import Button from "./Button"

export default class Footer extends React.Component {

    render() {

        const { likes, comments, toggleCommentBox} = this.props

        let buttons = [
                        { title: "Like", value: likes, icon: "fa fa-thumbs-up", onClick: () => console.log("LIKE") },
                        { title: "Comment", value: comments, icon: "fa fa-envelope", onClick: toggleCommentBox}
                    ]

        buttons = buttons.map((button, i) => <Button {...button} key={i}/>)

        return (
            <div class="panel-footer">
                <div class="row">
                    {buttons}
                </div>
            </div>
        )
    }
}
