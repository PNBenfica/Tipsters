import React from "react"
import ReactDOM from "react-dom"

import Chart from 'chart.js'

import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import ProfilePanel from "./../ProfilePanel"
import SportsFiltersList from "./SportsFiltersList"
import TimeSelector from "./TimeSelector"

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
    		active: data,
    		filterOpen: false,
    		filters: [],
    		timeFilter: "Ever",
		}
	}

	removeSiblingFilters(filterName, allSelections){
		let filters = [...this.state.filters]
		allSelections.forEach(
			selection => {
    			filters = this.sliceArrayFrom(filters, selection.name)
			}
		)
		return filters
	}

	containsFilter(filterName){
		return this.state.filters.includes(filterName)
	}

	addFilter(filterName, allSelections){
		if (!this.containsFilter(filterName)){
			const filters = [...this.removeSiblingFilters(filterName, allSelections), filterName]
			this.setState({ filters })
		}
	}

	removeFilter(filterName){
		if (this.state.timeFilter === filterName)
			this.removeTimeFilter()
		else
			this.removeSportFilter(filterName)
	}

	removeSportFilter(filterName){
		const filters = this.sliceArrayFrom(this.state.filters, filterName)
		let active = this.state.data
		if (filters.length > 0){
			const lastFilter = filters[filters.length - 1];
			active = this.findSelection(active.selections, lastFilter)
		}
		this.setState({ filters, active })
	}

	findSelection(selections, name){

		const selection = selections.find(selection => selection.name == name)
		if (typeof selection === 'undefined')
			return this.findSelection(selections.map(selection => selection.selections).reduce((a,b)=>a.concat(b), []), name)
		else
			return selection
	}

	/* 
	* @desc removes all elements starting from str
	* @return the sliced array
	*/
	sliceArrayFrom(array, str){
		const index = array.findIndex(ele => ele === str)
		if (index != -1){
			return array.slice(0, index)
		}
		else{
			return array
		}
	}

	onPieClick(index){
		const pieClicked = this.state.active.selections[index]
		if (typeof pieClicked.selections === "undefined")
			pieClicked.selections = this.state.active.selections
		this.addFilter(pieClicked.name, this.state.active.selections)
		this.setState( { active: pieClicked } )
	}

	onFilterClick(){
		this.setState( { filterOpen: !this.state.filterOpen } )
	}

	onTimeSelectorOptionClick(timeFilter){
		this.onFilterClick()
		this.setState( { timeFilter } )
	}

	removeTimeFilter(){
		this.setState( { timeFilter: "Ever" } )
	}

	getFiltersList(){
		let filters = this.state.filters
		if (this.state.timeFilter !== "Ever")
			filters = filters.concat(this.state.timeFilter)
		return filters
	}

    render() {

        return (
            <ProfilePanel header="Stats">

				<TimeSelector open={this.state.filterOpen} active={this.state.timeFilter} onFilterClick={this.onFilterClick.bind(this)} onOptionClick={this.onTimeSelectorOptionClick.bind(this)} />

		        <BarChart data={this.state.active.betStats} />

		        <br/>
		        <SportsFiltersList list={this.getFiltersList()} removeFilter={this.removeFilter.bind(this)} />
		        <br/>
		        
		        <DoughnutChart data={this.state.active.selections} onPieClick={this.onPieClick.bind(this)} />

            </ProfilePanel>
        )
    }
}
