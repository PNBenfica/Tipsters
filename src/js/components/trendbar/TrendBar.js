import React from "react"

import TrendEvents from "./trendEvents/TrendEvents"
import TrendUsers from "./trendUsers/TrendUsers"

export default class TrendBar extends React.Component {

  render() {

    return (
        <div>
            <TrendEvents />
            <TrendUsers />
        </div>
    )
  }
}
