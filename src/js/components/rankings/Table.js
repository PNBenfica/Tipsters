import React from "react"

import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

export default class Table extends React.Component {

    render() {

        const { values } = this.props

        return (
            
            <div class="table-responsive">
                <table class="table table-striped">
                    
                    <TableHeader />

                    <TableBody values={values} />

                </table>
            </div>
        )
    }
}
