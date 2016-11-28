import React from "react"

import PaginationButton from "./PaginationButton"

export default class Pagination extends React.Component {

    render() {

        const { nextPage, previousPage } = this.props

        return (
            <nav aria-label="...">
                <ul class="pagination pagination-sm">

                    <PaginationButton name="Previous" icon="&laquo;" onClick={previousPage} />
                    <PaginationButton name="Next" icon="&raquo;" onClick={nextPage} />

                </ul>
            </nav>
        )
    }
}
