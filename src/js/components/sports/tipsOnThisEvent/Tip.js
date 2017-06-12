import React from "react";

import EventURL from "./../EventURL"

export default class Tip extends React.Component {

    render() {

        const { betId, betName, choiceId, choiceName, leagueId, leagueName, matchId, matchName, odd, sportId, sportName, status } = this.props;

        const eventURL = new EventURL({ name : sportName, id : sportId }, { name : leagueName, id : leagueId }, { name : matchName, id : matchId })
        const path = eventURL.renderPath() 

        return (
            <div class="panel post-tips">
                <p>{betName + ":" + choiceName}</p>
                <p><a href={path}>{matchName}</a></p>
                <p>{odd}</p>
            </div>
        )
    }
}
