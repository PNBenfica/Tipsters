import React from "react";

export default class Tip extends React.Component {

  render() {

    const { tipnumber , selection , event, odd} = this.props;

    return (
        <div class="panel post-tips">
            <p>{tipnumber}. {selection}</p>
            <p><a href="#/sports">{event}</a></p>
            <p>{odd}</p>
        </div>
    );
  }
}
