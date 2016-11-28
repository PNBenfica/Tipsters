import React from "react"

export default class PaginationButton extends React.Component {

    render() {

        const { name, icon, onClick } = this.props

        return (
            <li class="page-item" onClick={() => onClick()}>
                <a class="page-link" aria-label={name}>
                    <span aria-hidden="true">{icon}</span>
                    <span class="sr-only">{name}</span>
                </a>
            </li>
        )
    }
}
