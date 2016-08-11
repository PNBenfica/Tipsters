import React from "react";
import classNames from "classnames";

export default class TrendEventItem extends React.Component {

    render() {

        const {event, description} = this.props;
    	const descriptionClasses = classNames("small-text", {hidden: typeof description === "undefined" });
        console.log(this.props);

        return (
            <li class="list-group-item">
                <a href="#">{event}</a>
                <p class={descriptionClasses}>{description}</p>
            </li>
        );
    }
}
