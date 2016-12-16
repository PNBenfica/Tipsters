import React from "react";

export default class AboutListItem extends React.Component {

    render() {

        const {description, value} = this.props;

        return (
            <div class="col-xs-12 about-table">
                <p class="col-xs-5 description">{description}</p>
                <p class="col-xs-7">{value}</p>
            </div>
        );
    }
}
