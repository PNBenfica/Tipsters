import React from "react"

import TableRow from "./TableRow"

export default class TableBody extends React.Component {

    render() {
        
        const { data } = this.props

        return (
            <tbody>
                { data.map((row,i) => <TableRow key={i} {...row} /> ) }
            </tbody>
        )
    }
}
