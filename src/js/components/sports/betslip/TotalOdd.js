import React from "react";

export default class TotalOdd extends React.Component {

    render() {

        const {totalOdd} = this.props;

        return (
            <p id="bet-slip-total-odd">Total odd: {totalOdd}</p>
        );
  }
}
