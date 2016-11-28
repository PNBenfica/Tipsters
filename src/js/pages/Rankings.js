import React from "react"

import Table from "./../components/rankings/Table"
import Pagination from "./../components/rankings/Pagination"

export default class Rankings extends React.Component {

	constructor(args){
		super(...args)
		this.state = {
			startAt:0, 
			data : [
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 1, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 2, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 3, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 4, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 5, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 6, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 7, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 8, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 9, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 10, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 11, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 12, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 13, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 14, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
				{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, rank: 15, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5}]
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

	render() {

		const nVisibleRows = 10
		const data = this.state.data.slice(this.state.startAt, this.state.startAt + nVisibleRows)

		return (
			<div id="rankings">
				
				<div class="row">
					<div class="col-lg-12">
						
						<Table data={data}/>

						<Pagination nextPage={this.nextPage.bind(this)} previousPage={this.previousPage.bind(this)}/>
					</div>
				</div>

			</div>
		)
	}
}
