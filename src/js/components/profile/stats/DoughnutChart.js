import React from "react"
import ReactDOM from "react-dom"

import {Doughnut} from 'react-chartjs-2';

import ProfilePanel from "./../ProfilePanel"

export default class DoughnutChart extends React.Component {

	chartClicked(evt){
		const index = this.refs.chart.chart_instance.getElementAtEvent(evt)[0]._index
		this.props.onPieClick( index )
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
				backgroundColor:        ['rgba(195,0,0,0.5)','rgba(244,121,32,0.5)', 'rgba(253,180,20,0.5)', 'rgba(235,235,0,0.5)', '#FF8000', '#C7AC12', '#27F5D9'],
				hoverBackgroundColor:   ['rgba(195,0,0,0.7)','rgba(244,121,32,0.7)', 'rgba(253,180,20,0.7)', 'rgba(235,235,0,0.7)', '#E87A0C', '#B59D14', "#25D9C1"],
                borderColor:            ['rgba(195,0,0,1.0)','rgba(244,121,32,1.0)', 'rgba(253,180,20,1.0)', 'rgba(235,235,0,1.0)', '#E87A0C', '#B59D14', "#25D9C1"]
			}]
		}

        return (
	        <Doughnut ref="chart" data={chartData} options={{ onClick: this.chartClicked.bind(this) }} />
        )
    }
}
