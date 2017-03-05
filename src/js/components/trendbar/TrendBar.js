import React from "react"
import { connect } from "react-redux"

import { fetchTrends } from "./../../actions/trendsActions"

import TrendEvents from "./trendEvents/TrendEvents"
import TrendUsers from "./trendUsers/TrendUsers"


@connect((store) => {
    return {
        users: store.trends.users,
        events: store.trends.events,
        fetched: store.trends.fetched,
        fetching: store.trends.fetching,
    }
})
export default class TrendBar extends React.Component {

	componentWillMount(){
		if (!this.props.fetched){
			this.fetchTrends()
		}
	}

	fetchTrends(){
		setTimeout(() => this.props.dispatch(fetchTrends()), 5000)
        
	}


	render() {

		const { users, events } = this.props
				// <TrendEvents events={events} />

		let { fetching } = this.props
		fetching = users.length === 0

		return (
			<div>
				<TrendUsers fetching={fetching} users={users} />
			</div>
		)
	}
}
