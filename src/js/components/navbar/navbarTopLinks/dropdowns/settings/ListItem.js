import React from "react"

export default class ListItem extends React.Component {

    render() {

        const { title, ref, icon } = this.props

        return (
            <li>
                <a href={ref}><i class={icon}></i> {title}</a>
            </li>
        )
    }
}
