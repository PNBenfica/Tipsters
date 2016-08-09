import React from "react";


export default class Date extends React.Component {

  render() {

    const {date} = this.props;

    return (
        <small class="pull-right text-muted">
            <i class="fa fa-clock-o fa-fw"></i> {date}
        </small>
    );
  }
}
