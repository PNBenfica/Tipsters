import React from "react";
import classNames from "classnames";

export default class TrendEventItem extends React.Component {

    render() {

        const {homeTeam, awayTeam, description} = this.props;
    	const descriptionClasses = classNames("small-text", {hidden: typeof description === "undefined" });

        return (
            <div class="panel trend-event">
                <a href="#/sports/football/1/premier-league/3/arsenal-united/1267076">
                    <div class="trend-event-team"><img src={homeTeam.logo}/>{homeTeam.name}</div>
                    <div class="trend-event-team"><img src={awayTeam.logo}/>{awayTeam.name}</div>
                    <div class="panel-footer">
                        <span class={descriptionClasses}>{description}</span>
                    </div>
                </a>
            </div>
        );
    }
}
