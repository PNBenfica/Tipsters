import React from "react"
import classNames from "classnames"

export default class Breadcrumb extends React.Component {


  	render() {

	    let {sport, sportCode, league, leagueCode, match, matchCode} = this.props

	    let options = [{name:sport, code: sportCode, logo: "fa fa-futbol-o"}, {name:league, code: leagueCode, logo: "flag-icon flag-icon-gb-eng"}, {name:match, code: matchCode}].filter((ele) => typeof ele.name !== "undefined")

	    let ref = "#/sports"

	    options = options.map((option, i) => {
	    	ref += "/" + option.name + "/" + option.code
	    	const logo = (typeof option.logo !== 'undefined') ? <span class={classNames("logo",option.logo)}></span> : null

	    	if (i === options.length - 1)
	    		return <li key={i} class="active">{logo}{option.name}</li>
	    	else
	    		return <li key={i}><a href={ref}>{logo}{option.name}</a></li>
	    })

	    return (
	        <ol class={ classNames("breadcrumb",{'hidden':options.length===1}) }>
	            {options}
	        </ol>
	    );
  	}
}
