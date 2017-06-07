import React from "react"

import classNames from "classnames"

import SVG from "./../../SVG"

export default class BetSlip extends React.Component {

	constructor(args){
		super(...args)
		this.state = { scaleUpDown: true }
	}

	componentWillReceiveProps(nextProps){
		if ( nextProps.n !== this.props.n )
			this.setState( { scaleUpDown : false }, () => setTimeout(() => this.setState({ scaleUpDown : true }), 500) )
	}

    
    render() {

    	const { icon, n, onClick } = this.props
    	const { scaleUpDown } = this.state

        return (
            <div class="icon" onClick={()=>onClick()} ><SVG icon={icon}></SVG><div class={classNames("n",{scaleUpDown})} ><span>{n}</span></div></div>
        )
    }
}
