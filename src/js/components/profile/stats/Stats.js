import React from "react"
import ReactDOM from "react-dom"

import Chart from 'chart.js'

import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import ProfilePanel from "./../ProfilePanel"

export default class Stats extends React.Component {

	constructor(args){
		super(...args)
		/*TODO - create first element of array dinamically */
		let data = {
				name: "All",
				selections: [
					{name:"Football", betStats:[ {name:"Match Result", values:[7,2]}, {name:"Correct Score", values:[5,8]}, {name:"Total Goals", values:[5,6]}, {name:"Over/Under", values:[10,6]}, {name:"Half-time result", values:[6,15]} ]},
					{name:"BasketBall", betStats:[ {name:"Match Result", values:[5,7]}, {name:"Total Points", values:[15,8]}, {name:"Handicap", values:[2,6]} ]},
					{name:"Tennis", betStats:[ {name:"Match Result", values:[2,5]}, {name:"Total Sets", values:[1,3]}, {name:"Total Games", values:[2,6]} ]} ]
			}
		data.betStats = data.selections
		this.state = {
			data : data,
    		active: data
		}
	}

	changeStats(index){
		this.setState( {active: index + 1} )
	}

    render() {

        return (
            <ProfilePanel header="Stats">

		        <DoughnutChart changeStats={this.changeStats.bind(this)} />

		        <br/>
		        <br/>

		        <BarChart data={this.state.active.selections} />

            </ProfilePanel>
        )
    }
}
