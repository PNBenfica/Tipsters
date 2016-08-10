import React from "react";


export default class Breadcrumb extends React.Component {

	formatOption(string) {
	    return string.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
	}

  	render() {

	    let {sport, league, match} = this.props;

	    let options = [sport, league, match].filter((ele) => typeof ele !== "undefined");

	    let ref = "#/sports";
	    for (var i = 0; i < options.length; i++){
	    	ref += "/" + options[i];

	    	const name = this.formatOption(options[i]);
	    	if (i === options.length - 1)
	    		options[i] = <li key={i} class="active">{name}</li>;
	    	else
	    		options[i] = <li key={i}><a href={ref}>{name}</a></li>;
	    }

	    return (
	        <ol class="breadcrumb">
	            {options}
	        </ol>
	    );
  	}
}
