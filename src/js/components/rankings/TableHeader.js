import React from "react"

export default class TableHeader extends React.Component {

    render() {

        return (
            <thead>
                <tr>
                    <th class="col-xs-4 col-md-2">Tipster</th>
                    <th class="col-xs-1">ROI</th>
                    <th class="col-xs-1">Win %</th>
                    <th class="col-xs-1">Avg Win Odds</th>
                    <th class="col-xs-1">Tips</th>
                    <th class="col-xs-1">Followers</th>
                    <th class="col-xs-1">Streak</th>
                </tr>
            </thead>
        )
    }
}
