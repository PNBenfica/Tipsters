import React from "react";
var classNames = require('classnames');

export default class TipsterComment extends React.Component {

  render() {

    const { comment } = this.props;
    const commentClass = classNames('tipster-comment', {'hidden' : !comment});

    return (
        <p className={commentClass}>{comment}</p>
    );
  }
}
