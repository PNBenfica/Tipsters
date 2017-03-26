import React from "react"


export default class TimeAgo extends React.Component {

	isYesterday(date){
		return date.getDate() == (new Date()).getDate() - 1
	}

	isToday(date){
		return date.getDate() == (new Date()).getDate()
	}

	// less than a minute
	isLessThanAMinute(date){
		return this.timeAgoMinutes(date) < 1
	}

	isLessThanAHour(date){
		return this.timeAgoMinutes(date) < 60
	}

	timeAgo(date){
		return ((new Date) - date)
	}


	timeAgoMinutes(date){
		return Math.floor(this.timeAgo(date) / 60000)
	}

	getMinutes(date){
		return ('0' + date.getMinutes()).slice(-2)
	}

    render() {

    	let { date } = this.props
    	
    	date = new Date(date)

    	let dateString = date.getHours() + ":" + this.getMinutes(date)

    	if (this.isToday(date)){
    		if (this.isLessThanAMinute(date))
    			dateString = "Just now"
    		else if (this.isLessThanAHour(date))
    			dateString = this.timeAgoMinutes(date) + (this.timeAgoMinutes(date) == 1? " minute ago" : " minutes ago")
    	}

    	else {
    		if (this.isYesterday(date))
    			dateString = "Yesterday at " + dateString
    		else
    			dateString = date.getDate() + "/" + date.getMonth() + " " + dateString
    	}

        return (<span>{ dateString }</span>)
    }
}
