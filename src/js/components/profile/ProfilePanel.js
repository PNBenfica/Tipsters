import React from "react";


export default class ProfilePanel extends React.Component {

    render() {

        const {header} = this.props;

        return (
            <div class="profile-panel">

                <div class="panel-heading">
                    <h3 class="panel-title">
                        {header}
                    </h3>
                </div>

                <div class="panel">
                    <div class="panel-body">
                        {this.props.children}
                    </div>
                </div>

            </div>
        );
    }
}
