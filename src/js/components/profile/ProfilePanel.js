import React from "react";


export default class ProfilePanel extends React.Component {

    render() {

        const {header} = this.props;

        return (
            <div class="panel profile-panel">

                <div class="panel-heading">
                    <h5>{header}</h5>
                </div>

                <div class="panel-body">
                    {this.props.children}
                </div>

            </div>
        );
    }
}
