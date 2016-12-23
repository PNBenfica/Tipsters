import React from "react"
import ReactDOM from "react-dom"

import {Doughnut} from 'react-chartjs-2';

import ProfilePanel from "./../ProfilePanel"

export default class DoughnutChart extends React.Component {

	chartClicked(evt){
		const index = this.refs.chart.chart_instance.getElementAtEvent(evt)[0]._index
		this.props.changeStats( index )
	}


    /*
    * @return a array with the name of each label
    */
    getLabels(data){
        return data.map(stat => stat.name)
    }

    /*
    * @return the sum of all elements of an array
    */
    sumArray(array){
        return array.reduce((a,b) => a + b, 0)
    }

    render() {

    	const { data } = this.props

		const chartData = {
			labels: this.getLabels(data),
			datasets: [{
				data: data.map(selection => this.sumArray(selection.values)),
				backgroundColor: ['#FF6384','#36A2EB','#FFCE56', '#00FF00', '#FF8000', '#C7AC12', '#27F5D9'],
				hoverBackgroundColor: ['#E85A78','#1D9CF2','#FFC22B', '#09E309', '#E87A0C', '#B59D14', "#25D9C1"]
			}]
		}

        return (
	        <Doughnut ref="chart" data={chartData} options={{ onClick: this.chartClicked.bind(this) }} />
        )
    }
}
