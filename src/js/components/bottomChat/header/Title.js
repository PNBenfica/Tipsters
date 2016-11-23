import React from "react"

export default class Title extends React.Component {

    render() {

        const { title, href, toggle } = this.props

        return (
            <a data-toggle="collapse" onClick={() => toggle()} href={href}>
                {title}
            </a>
        )
    }
}
