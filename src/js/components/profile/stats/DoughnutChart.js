import React from "react"
import ReactDOM from "react-dom"

import Chart from 'chart.js'

import BarChart from './BarChart';
import {Doughnut} from 'react-chartjs-2';

import ProfilePanel from "./../ProfilePanel"

export default class DoughnutChart extends React.Component {

	chartClicked(evt){
		const index = this.refs.chart.chart_instance.getElementAtEvent(evt)[0]._index
		this.props.changeStats( index )
	}

    render() {

		const data = {
			labels: [
				'Football',
				'BasketBall',
				'Tennis'
			],
			datasets: [{
				data: [300, 50, 100],
				backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				],
				hoverBackgroundColor: [
				'#E85A78',
				'#1D9CF2',
				'#FFC22B'
				]
			}]
		}

        return (
	        <Doughnut ref="chart" data={data} options={{ onClick: this.chartClicked.bind(this) }} />
        )
    }
}
