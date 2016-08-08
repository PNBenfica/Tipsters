import React from "react";

export default class TrendEventItem extends React.Component {

    render() {

        const {event, description} = this.props;

        return (
            <li class="list-group-item">
                <a href="#">{event}</a>
                <p class="small-text">{description}</p>
            </li>
        );
    }
}
