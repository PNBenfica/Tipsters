import React from "react";

export default class UserListItem extends React.Component {

    render() {
        
        const {name, img} = this.props;

        return (
            <a href="#/profile" class="img-wrapper col-xs-2">
                <img src={img} />
                <p class="caption">{name}</p>
            </a>
        );
    }
}
