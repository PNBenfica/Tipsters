import React from "react"

export default class TableHeader extends React.Component {

    renderTH(title, i){
        if (title == this.props.sortBy)
            return <th key={i} class="col-xs-1">{title}<i class="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
        else
            return <th key={i} class="col-xs-1" onClick={()=> this.props.changeSort(title)}>{title}</th>
    }

    render() {

        const headers = ["ROI", "Win %", "Avg Win Odds", "Tips", "Followers", "Streak"].map(this.renderTH.bind(this))

        return (
            <thead>
                <tr>
                    <th class="col-xs-4 col-md-2">Tipster</th>
                    {headers}
                </tr>
            </thead>
        )
    }
}
