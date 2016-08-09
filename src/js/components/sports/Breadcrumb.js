import React from "react";


export default class Breadcrumb extends React.Component {

	capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

  	render() {

	    let {sport, league} = this.props;
	    sport = this.capitalizeFirstLetter(sport);

	    return (
	        <ol class="breadcrumb">
	            <li class="active">{sport}</li>
	        </ol>
	    );
  	}
}
