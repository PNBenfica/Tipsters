import React from "react"

import Button from "./Button"

export default class Footer extends React.Component {

    render() {

        const { likes, liked, likePost, comments, toggleCommentBox} = this.props

        let buttons = [
                        { value: likes, icon: "fa fa-thumbs-o-up", active: liked, onClick: likePost },
                        { value: comments, icon: "fa fa-envelope-o", active: false, onClick: toggleCommentBox}
                    ]

        buttons = buttons.map((button, i) => <Button {...button} key={i}/>)

        return (
            <footer>
                {buttons}
            </footer>
        )
    }
}
