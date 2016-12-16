import React from "react";

export default class SeeAllButton extends React.Component {

    render() {

        return (
            <a class="img-wrapper">
                <span class="see-all-followers">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </span>
            </a>
        );
    }
}