import React from "react";


export default class Breadcrumb extends React.Component {


  	render() {

	    let {sport, sportCode, league, leagueCode, match, matchCode} = this.props;

	    let options = [{name:sport, code: sportCode}, {name:league, code: leagueCode}, {name:match, code: matchCode}].filter((ele) => typeof ele.name !== "undefined");

	    let ref = "#/sports";

	    options = options.map((option, i) => {
	    	ref += "/" + option.name + "/" + option.code;

	    	if (i === options.length - 1)
	    		return <li key={i} class="active">{option.name}</li>;
	    	else
	    		return <li key={i}><a href={ref}>{option.name}</a></li>;
	    })

	    return (
	        <ol class="breadcrumb">
	            {options}
	        </ol>
	    );
  	}
}
