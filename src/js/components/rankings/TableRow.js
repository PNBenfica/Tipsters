import React from "react"

export default class TableRow extends React.Component {

    render() {

        const { stats, tipster, rank } = this.props
        const { ROI, winPercentage, avgWinOdds, nTips, nFollowers, streak } = stats
                 
        return (
            <tr>
                <th scope="row"><p>{rank}.</p> <img src={tipster.avatar} class="img-thumbnail img-circle"/><a href="#/profile">{tipster.name}</a></th>
                <td>{ROI}%</td>
                <td>{winPercentage}%</td>
                <td>{avgWinOdds}</td>
                <td>{nTips}</td>
                <td>{nFollowers}</td>
                <td>{streak}</td>
            </tr>
        )
    }
}
