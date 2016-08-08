import React from "react";

import TrendEvents from "./TrendEvents";
import TrendUsers from "./TrendUsers";

export default class TrendBar extends React.Component {

  render() {

    return (
        <div>
            <TrendEvents />
            <TrendUsers />
        </div>
    );
  }
}
