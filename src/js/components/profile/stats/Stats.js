import React from "react"
import ReactDOM from "react-dom"

import Chart from 'chart.js'

import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import ProfilePanel from "./../ProfilePanel"

export default class Stats extends React.Component {

	constructor(args){
		super(...args)
		let data = {
				name: "All",
				selections: [
					{
						name:"Football", 
						values:[35,18], 
						betStats:[ {name:"Match Result", values:[7,2]}, {name:"Correct Score", values:[5,8]}, {name:"Total Goals", values:[5,6]}, {name:"Over/Under", values:[10,6]}, {name:"Half-time result", values:[6,15]} ],
						selections: [
							{
								name:"Premier League", 
								values:[20,6],
								betStats:[ {name:"Match Result", values:[15,7]}, {name:"Total Goals", values:[15,8]}, {name:"Handicap", values:[5,6]} ]
							},
							{
								name:"Bundesliga", 
								values:[1,4],
								betStats:[ {name:"Match Result", values:[2,5]}, {name:"Total Goals", values:[1,4]}, {name:"Handicap", values:[0,1]} ]
							},
							{
								name:"Liga NOS", 
								values:[5,2],
								betStats:[ {name:"Match Result", values:[6,3]}, {name:"Total Goals", values:[1,2]}, {name:"Handicap", values:[5,1]} ]
							}
						]
					},
					{
						name:"BasketBall", 
						values:[10,6], 
						betStats:[ {name:"Match Result", values:[5,7]}, {name:"Total Points", values:[15,8]}, {name:"Handicap", values:[2,6]} ],
						selections: [
							{
								name:"NBA", 
								values:[20,15], 
								betStats:[ {name:"Match Result", values:[10,5]}, {name:"Total Points", values:[1,0]}, {name:"Handicap", values:[1,3]} ]
							},
							{
								name:"La Liga", 
								values:[2,1], 
								betStats:[ {name:"Match Result", values:[2,1]} ]
							}
						]
					},
					{
						name:"Tennis",
						values:[8,15],
						betStats:[ {name:"Match Result", values:[2,5]}, {name:"Total Sets", values:[1,3]}, {name:"Total Games", values:[2,6]} ],
						selections: [
							{
								name:"US Open", 
								values:[20,15], 
								betStats:[ {name:"Match Result", values:[8,5]}, {name:"Total Points", values:[3,4]}, {name:"Total Sets", values:[1,3]}, {name:"Total Games", values:[5,6]} ]
							},
							{
								name:"Australia Open", 
								values:[2,3], 
								betStats:[ {name:"Match Result", values:[5,10]}, {name:"Total Points", values:[5,0]}, {name:"Total Sets", values:[7,3]}, {name:"Total Games", values:[2,6]} ]
							},
							{
								name:"Roland Garros", 
								values:[15,18], 
								betStats:[ {name:"Match Result", values:[5,8]}, {name:"Total Points", values:[4,2]}, {name:"Total Sets", values:[1,0]}, {name:"Total Games", values:[4,1]} ]
							},
							{
								name:"Wimbledon", 
								values:[8,9], 
								betStats:[ {name:"Match Result", values:[10,5]}, {name:"Total Points", values:[5,1]}, {name:"Total Sets", values:[1,2]}, {name:"Total Games", values:[8,1]} ]
							},
						]
					}]
			}
		data.betStats = data.selections
		this.state = {
			data : data,
    		active: data
		}
	}

	changeStats(index){
		if (typeof this.state.active.selections[index].selections === "undefined")
			this.state.active.selections[index].selections = this.state.active.selections
		this.setState( { active: this.state.active.selections[index] } )
	}

    render() {

        return (
            <ProfilePanel header="Stats">

		        <DoughnutChart data={this.state.active.selections} changeStats={this.changeStats.bind(this)} />

		        <br/>
		        <br/>

		        <BarChart data={this.state.active.betStats} />

            </ProfilePanel>
        )
    }
}
