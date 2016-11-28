import React from "react"

export default class TableRow extends React.Component {

    render() {

        const { rank, tipster, roi, winpercentage, avgWinOdds, tips, followers, streak } = this.props
        return (
            <tr>
                <th scope="row"><p>{rank}.</p> <img src={tipster.img} class="img-thumbnail img-circle"/><a href="#/profile">{tipster.name}</a></th>
                <td>{roi}%</td>
                <td>{winpercentage}%</td>
                <td>{avgWinOdds}%</td>
                <td>{tips}</td>
                <td>{followers}</td>
                <td>{streak}</td>
            </tr>
        )
    }
}
