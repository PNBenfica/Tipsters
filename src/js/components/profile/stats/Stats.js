import React from "react"
import ReactDOM from "react-dom"

import Chart from 'chart.js'

import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

import ProfilePanel from "./../ProfilePanel"

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
};

export default class Stats extends React.Component {

	chartClicked(evt){
		const index = this.refs.chart.chart_instance.getElementAtEvent(evt)[0]._index
		console.log(data.labels[index])
	}

    render() {
// console.log(Chart.defaults.global.hover)
const barData = {
  labels: ['Total', 'Over/Under', 'Correct Score', 'Match Result', 'Goalscorer', 'Half-time result', 'Total Goals'],
  datasets: [
    {
	  label:"Won",
      backgroundColor: 'rgba(0,255,0,0.2)',
      borderColor: 'rgba(0,255,0,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0,255,0,0.4)',
      hoverBorderColor: 'rgba(0,255,0,1)',
      data: [150, 59, 80, 81, 56, 55, 40]
    },
    {
	  label:"Lost",
      backgroundColor: 'rgba(255,99,0,0.2)',
      borderColor: 'rgba(255,99,0,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,0,0.4)',
      hoverBorderColor: 'rgba(255,99,0,1)',
      data: [135, 80, 81, 56, 55, 40, 65]
    }

  ]
}

        return (
            <ProfilePanel header="Stats">

        <Doughnut ref="chart" data={data} options={{ onClick: this.chartClicked.bind(this) }} />

        <br/>
        <br/>

        <Bar

          data={barData}
          options={{
            maintainAspectRatio: true,
            // multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
            scales: {
		        yAxes: [{
		            ticks: {
		                beginAtZero:true
		            }
		        }]
		    }
          }} />


            </ProfilePanel>
        )
    }
}
