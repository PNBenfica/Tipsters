import React from "react"

import Button from "./Button"

export default class Footer extends React.Component {

    render() {

        const { likes, comments, toggleCommentBox} = this.props

        let buttons = [
                        { value: likes, icon: "fa fa-thumbs-o-up", onClick: () => console.log("LIKE") },
                        { value: comments, icon: "fa fa-envelope-o", onClick: toggleCommentBox}
                    ]

        buttons = buttons.map((button, i) => <Button {...button} key={i}/>)

        return (
            <footer>
                {buttons}
            </footer>
        )
    }
}
