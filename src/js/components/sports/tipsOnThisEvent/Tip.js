import React from "react";

export default class Tip extends React.Component {

    render() {

        const { betId, betName, choiceId, choiceName, leagueId, leagueName, matchId, matchName, odd, sportId, sportName, status } = this.props;

        return (
            <div class="panel post-tips">
                <p>{betName + ":" + choiceName}</p>
                <p><a href="#/sports">{matchName}</a></p>
                <p>{odd}</p>
            </div>
        )
    }
}
