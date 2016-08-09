import React from "react";

export default class TipWithComment extends React.Component {

  render() {

    const {comment} = this.props;
    return (
        <p>
            {comment}
        </p>
    );
  }
}
