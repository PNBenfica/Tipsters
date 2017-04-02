import React from "react";

export default class UserListItem extends React.Component {

    render() {
        
        const {name, avatar} = this.props;

        return (
        	<a class="square" href={ "#/profile/" + name }>
        		<img src={avatar}/>
        		<div class="gradient"/>
                <p class="caption">{name}</p>
        	</a>
        );
    }
}
