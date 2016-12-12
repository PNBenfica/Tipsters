import React from "react";

export default class UserListItem extends React.Component {

    render() {
        
        const {name, img} = this.props;

        return (
            <a href="#/profile" class="img-wrapper">
                <img src={img} />
                <p class="caption">{name.substring(0,15)}</p>
            </a>
        );
    }
}
