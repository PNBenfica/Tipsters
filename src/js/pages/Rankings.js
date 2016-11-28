import React from "react"

import Pagination from "./../components/rankings/Pagination"
import SearchBar from "./../components/rankings/SearchBar"
import Table from "./../components/rankings/Table"

export default class Rankings extends React.Component {

	constructor(args){
		super(...args)
		this.state = {
			startAt:0,
			searchFilter : "",
			data : [
				{tipster: {name: "Rui Silva", img: "img/joaoalmeida.jpg"}, rank: 1, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Britta Buckmaster", img: "img/pauloteixeira.jpg"}, rank: 2, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Alberta Borrero", img: "img/joaoalmeida.jpg"}, rank: 3, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "So Granados", img: "img/pauloteixeira.jpg"}, rank: 4, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Rossana Allensworth", img: "img/joaoalmeida.jpg"}, rank: 5, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Ilse Betton", img: "img/pauloteixeira.jpg"}, rank: 6, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Patrick Hirata", img: "img/joaoalmeida.jpg"}, rank: 7, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Lewis Sampson", img: "img/joaoalmeida.jpg"}, rank: 8, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Len Shin", img: "img/pauloteixeira.jpg"}, rank: 9, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Brad Whitmire", img: "img/joaoalmeida.jpg"}, rank: 10, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Charla Roane", img: "img/pauloteixeira.jpg"}, rank: 11, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Cristina Lollar", img: "img/pauloteixeira.jpg"}, rank: 12, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Jeane Bethel", img: "img/joaoalmeida.jpg"}, rank: 13, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Franklin Meidinger", img: "img/pauloteixeira.jpg"}, rank: 14, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Micheal Nix", img: "img/joaoalmeida.jpg"}, rank: 15, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5}]
		}
	}

	nextPage(){
		const startAt = this.state.startAt + 10
		if (startAt < this.state.data.length)
			this.setState({ startAt })
	}

	previousPage(){
		const startAt = this.state.startAt - 10
		if (startAt >= 0)
			this.setState({ startAt })
	}

	/*
		@desc- function called when an letter is written in the search bar
	*/
	addSearchFilter(name){
		this.setState({ searchFilter: name.toLowerCase() })
	}

	filterData(data){
		return data.filter(rowData => rowData.tipster.name.toLowerCase().includes(this.state.searchFilter))
	}

	render() {

		const nVisibleRows = 10

		let data = this.state.data
		data = this.filterData(data)
		data = data.slice(this.state.startAt, this.state.startAt + nVisibleRows)

		return (
			<div id="rankings">
				
				<div class="row">
					<div class="col-lg-12">

						<SearchBar addSearchFilter={this.addSearchFilter.bind(this)}/>
						
						<Table data={data} />

						<Pagination nextPage={this.nextPage.bind(this)} previousPage={this.previousPage.bind(this)}/>

					</div>
				</div>

			</div>
		)
	}
}
