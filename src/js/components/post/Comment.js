import React from "react"
var classNames = require('classnames')

export default class Comment extends React.Component {

	render() {

		const { comment } = this.props
		const commentClass = classNames('tipster-comment', {'hidden' : !comment})

		return (
			<div class="col-xs-12">
				<p className={commentClass}>{comment}</p>
			</div>
		)
	}
}
