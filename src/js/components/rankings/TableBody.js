import React from "react"

import TableRow from "./TableRow"

export default class TableBody extends React.Component {

    render() {
        
        const { values } = this.props

        return (
            <tbody>
                { values.map((row,i) => <TableRow key={i} {...row} rank={i+1} /> ) }
            </tbody>
        )
    }
}
