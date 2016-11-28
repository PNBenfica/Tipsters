import React from "react"

import Table from "./../components/rankings/Table"

export default class Rankings extends React.Component {

	render() {

		const values = [
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5},
					{tipster: {name: "Paulo Teixeira", img: "img/joaoalmeida.jpg"}, roi: 5.24, winpercentage: 20 , avgWinOdds: 1.36, tips: 30 , followers: 6, streak: 5}]

		return (
			<div id="rankings">
				
				<div class="row">
					<div class="col-lg-12">
						<Table values={values}/>
					</div>
				</div>

			</div>
		)
	}
}
