import React from "react"

import TipRow from "./TipRow"

export default class TotalOdd extends React.Component {

    render() {

        const { odd } = this.props

        return (
			<TipRow title="Total Odd" value={odd} />
		)
  	}
}