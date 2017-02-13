import React from "react"
var classNames = require('classnames')

import TipRow from "./TipRow"

export default class Comment extends React.Component {

	render() {

		const { comment } = this.props
		const commentClass = classNames({'hidden' : !comment})

		return (
			<div class={commentClass}>
			
				<TipRow title="Comment" value={comment} />

			</div>
		)
	}
}
