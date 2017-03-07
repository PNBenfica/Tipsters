import React from "react";

export default class UserListItem extends React.Component {

    render() {
        
        const {name, img} = this.props;

                // <p class="caption">{name.substring(0,15)}</p>
        return (
        	<a class="square" href="#/profile">
        		<img src={img}/>
        		<div class="gradient"/>
                <p class="caption">{name}</p>
        	</a>
        );
    }
}
