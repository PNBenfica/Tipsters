import React from "react"

export default class Time extends React.Component {
	

	isToday(date){
		return date.getDate() == (new Date()).getDate()
	}
    

	getMinutes(date){
		return ('0' + date.getMinutes()).slice(-2)
	}

    render() {

        let { date } = this.props

    	date = new Date(date)

    	let dateString = date.getHours() + ":" + this.getMinutes(date)

    	if (!this.isToday(date))
    		dateString = date.getHours() + "/" + date.getMonth() + " " + dateString

        return (
            <em>{dateString}</em>
        )
    }
}
