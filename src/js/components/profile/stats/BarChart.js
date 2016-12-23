import React from "react"

import {Bar} from 'react-chartjs-2';

export default class BarChart extends React.Component {

    /*
    *   @return an array with the wins or loss (based on the filter) of each stat
    */
    getTotalBetsList(data, index){
        return data.map(selection => selection.betStats.map(stat => stat.values[index]).reduce((a,b)=>a+b ))
    }

    /*
    *   @return an array with the wins of each stat
    *       [{..., [nWin1, ]}, {..., [nWin2, ]}] => [nWin1, nWin2]
    */
    getWonBets(data){
        return data.map(stat => stat.values[0])
    }

    /*
    *   @return an array with the wins of each stat
    *       [{..., [, nLost1]}, {..., [nLost2, ]}] => [nLost1, nLost2]
    */
    getLostBets(data){
        return data.map(stat => stat.values[1])
    }

    /*
    *   @return the total number of won bets
    */
    getTotalWonBets(data){
        return this.sumArray(this.getWonBets(data))
    }

    /*
    *   @return the total number of lost bets
    */
    getTotalLostBets(data){
        return this.sumArray(this.getLostBets(data))
    }

    /*
    * @return the sum of all elements of an array
    */
    sumArray(array){
        return array.reduce((a,b) => a + b, 0)
    }

    /*
    * @return a array with the name of each stat
    */
    getLabels(data){
        return data.map(stat => stat.name)
    }

    render() {

        // data = [ {name:"label", values:[nWin,nLost]} , {...}, ...]
        const { data } = this.props

        const labels = ["Total", ...this.getLabels(data)]
        const won = [this.getTotalWonBets(data), ...this.getWonBets(data)]
        const lost = [this.getTotalLostBets(data), ...this.getLostBets(data)]

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label:"Won",
                    backgroundColor: 'rgba(0,255,0,0.2)',
                    borderColor: 'rgba(0,255,0,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0,255,0,0.4)',
                    hoverBorderColor: 'rgba(0,255,0,1)',
                    data: won
                },
                {
                    label:"Lost",
                    backgroundColor: 'rgba(255,99,0,0.2)',
                    borderColor: 'rgba(255,99,0,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,0,0.4)',
                    hoverBorderColor: 'rgba(255,99,0,1)',
                    data: lost
                }

            ]
        }

        return (
            <Bar

              data={chartData}
              options={{
                scales: {
    		        yAxes: [{
    		            ticks: {
    		                beginAtZero:true
    		            }
    		        }]
    		    }
              }} />
        )
    }
}
