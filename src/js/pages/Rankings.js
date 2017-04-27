import React from "react"
import { connect } from "react-redux"

import { fetchRankings, sortRankings } from "../actions/rankingsActions"

import LoadingGif from "./../components/LoadingGif"
import Pagination from "./../components/rankings/Pagination"
import FiltersContainer from "./../components/rankings/FiltersContainer"
import Table from "./../components/rankings/Table"

@connect((store) => {
    return {
        users: store.rankings.users,
        fetched: store.rankings.fetched,
        fetching: store.rankings.fetching,
    }
})
export default class Rankings extends React.Component {

	constructor(args){
		super(...args)
		this.state = {
			startAt:0,
			searchFilter : "",
			filters: [{name:"Since", active: "Ever", values:["Last Week","Last Month","Ever"]},
					  {name:"Odds over", active: "All", values:[1.1,1.2,1.3,"All"]},
					  {name:"Sports", active: "All", values:["Football","Basketball","Tennis", "All"]}],
			sortBy: "ROI"
		}
	}

    componentWillMount() {
        this.fetchRankings()
    }


    fetchRankings(){
        this.props.dispatch(fetchRankings())
    }

    componentWillReceiveProps(nextProps){
    	const { users } = nextProps
    	if (users){
			users.forEach((user,i) => {
				user.rank = i + 1
				user.stats.ROI = user.stats.ROI.toFixed(2)
				user.stats.avgWinOdds = user.stats.avgWinOdds.toFixed(2)
				user.stats.winPercentage = user.stats.winPercentage.toFixed(2)
			})
		}
    }

	nextPage(){
		const startAt = this.state.startAt + 10
		if (startAt < this.props.users.length)
			this.setState({ startAt })
	}

	previousPage(){
		const startAt = this.state.startAt - 10
		if (startAt >= 0)
			this.setState({ startAt })
	}

	/*
		@desc- function called when a table header is clicked
	*/
	changeSort(sortBy){
		const sortMap = {
			"Followers": "nFollowers",
			"ROI": "ROI",
			"Win %": "winPercentage",
			"Avg Win Odds": "avgWinOdds",
			"Tips": "nTips",
			"Streak": "streak"
		}
		this.props.dispatch(sortRankings(sortMap[sortBy]))
		this.setState({ sortBy })
	}

	/*
		@desc- function called when a filter is selected
	*/
	addFilter(filterName, value){
		const filters = [...this.state.filters]
		let filterToUpdate = this.state.filters.find(filter => filter.name == filterName)
		filterToUpdate.active = value
		this.setState({ filters })
	}

	/*
		@desc- function called when an letter is written in the search bar
	*/
	addSearchFilter(name){
		this.setState({ searchFilter: name.toLowerCase() })
	}

	applyFilters(){
		console.log("TODO: apply filter")
	}

	filterData(data){
		return data.filter(rowData => rowData.tipster.name.toLowerCase().includes(this.state.searchFilter))
	}

	render() {

		const { fetching, fetched, users } = this.props

        if (fetching || !fetched) {
        	return this.renderLoadingGif()
        }

		const nVisibleRows = 10

		let data = this.filterData(users)
		data = data.slice(this.state.startAt, this.state.startAt + nVisibleRows)

		return (
			<div id="rankings">
				
				<FiltersContainer filters={this.state.filters} addFilter={this.addFilter.bind(this)} applyFilters={this.applyFilters.bind(this)} addSearchFilter={this.addSearchFilter.bind(this)}/>
				
				<Table data={data} sortBy={this.state.sortBy} changeSort={this.changeSort.bind(this)}/>

				<Pagination nextPage={this.nextPage.bind(this)} previousPage={this.previousPage.bind(this)}/>

			</div>
		)
	}

	renderLoadingGif(){
		return <div id="rankings"><LoadingGif /></div>
	}
}
